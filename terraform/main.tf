# =============================================================================
# Terraform Configuration for Portfolio Infrastructure
# Author: Nithin Thadem
# Provider: Google Cloud Platform (GCP)
# =============================================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
  }

  # Remote state configuration (uncomment for production)
  # backend "gcs" {
  #   bucket = "portfolio-terraform-state"
  #   prefix = "terraform/state"
  # }
}

# -----------------------------------------------------------------------------
# Provider Configuration
# -----------------------------------------------------------------------------
provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

# -----------------------------------------------------------------------------
# Data Sources
# -----------------------------------------------------------------------------
data "google_client_config" "default" {}

# -----------------------------------------------------------------------------
# Local Values
# -----------------------------------------------------------------------------
locals {
  common_labels = {
    environment = var.environment
    project     = "portfolio"
    managed_by  = "terraform"
    owner       = "nithin-thadem"
  }

  app_name = "portfolio"
}

# -----------------------------------------------------------------------------
# VPC Network
# -----------------------------------------------------------------------------
resource "google_compute_network" "vpc" {
  name                    = "${local.app_name}-vpc-${var.environment}"
  auto_create_subnetworks = false
  project                 = var.project_id
}

resource "google_compute_subnetwork" "subnet" {
  name          = "${local.app_name}-subnet-${var.environment}"
  ip_cidr_range = var.subnet_cidr
  region        = var.region
  network       = google_compute_network.vpc.id
  project       = var.project_id

  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = var.pods_cidr
  }

  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = var.services_cidr
  }

  private_ip_google_access = true
}

# -----------------------------------------------------------------------------
# Cloud NAT for outbound internet access
# -----------------------------------------------------------------------------
resource "google_compute_router" "router" {
  name    = "${local.app_name}-router-${var.environment}"
  region  = var.region
  network = google_compute_network.vpc.id
  project = var.project_id
}

resource "google_compute_router_nat" "nat" {
  name                               = "${local.app_name}-nat-${var.environment}"
  router                             = google_compute_router.router.name
  region                             = var.region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
  project                            = var.project_id

  log_config {
    enable = true
    filter = "ERRORS_ONLY"
  }
}

# -----------------------------------------------------------------------------
# GKE Cluster
# -----------------------------------------------------------------------------
resource "google_container_cluster" "primary" {
  name     = "${local.app_name}-cluster-${var.environment}"
  location = var.zone
  project  = var.project_id

  # Enable Autopilot for simplified cluster management
  enable_autopilot = var.enable_autopilot

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods"
    services_secondary_range_name = "services"
  }

  # Workload Identity
  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  # Enable binary authorization
  binary_authorization {
    evaluation_mode = "PROJECT_SINGLETON_POLICY_ENFORCE"
  }

  # Logging and monitoring
  logging_config {
    enable_components = ["SYSTEM_COMPONENTS", "WORKLOADS"]
  }

  monitoring_config {
    enable_components = ["SYSTEM_COMPONENTS"]
    managed_prometheus {
      enabled = true
    }
  }

  # Maintenance window
  maintenance_policy {
    recurring_window {
      start_time = "2024-01-01T04:00:00Z"
      end_time   = "2024-01-01T08:00:00Z"
      recurrence = "FREQ=WEEKLY;BYDAY=SA,SU"
    }
  }

  # Resource labels
  resource_labels = local.common_labels

  # Private cluster configuration
  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = var.master_cidr
  }

  # Master authorized networks
  master_authorized_networks_config {
    cidr_blocks {
      cidr_block   = "0.0.0.0/0"
      display_name = "All networks"
    }
  }

  deletion_protection = var.environment == "prod" ? true : false
}

# -----------------------------------------------------------------------------
# Artifact Registry for Container Images
# -----------------------------------------------------------------------------
resource "google_artifact_registry_repository" "portfolio" {
  location      = var.region
  repository_id = "${local.app_name}-images"
  description   = "Docker repository for Portfolio application"
  format        = "DOCKER"
  project       = var.project_id

  labels = local.common_labels
}

# -----------------------------------------------------------------------------
# Cloud Run (Alternative deployment option)
# -----------------------------------------------------------------------------
resource "google_cloud_run_v2_service" "portfolio" {
  count    = var.deploy_to_cloud_run ? 1 : 0
  name     = "${local.app_name}-${var.environment}"
  location = var.region
  project  = var.project_id

  template {
    containers {
      image = var.container_image

      ports {
        container_port = 8080
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }

      startup_probe {
        http_get {
          path = "/health"
          port = 8080
        }
        initial_delay_seconds = 5
        period_seconds        = 10
        failure_threshold     = 3
      }

      liveness_probe {
        http_get {
          path = "/health"
          port = 8080
        }
        period_seconds = 30
      }
    }

    scaling {
      min_instance_count = var.environment == "prod" ? 1 : 0
      max_instance_count = 10
    }
  }

  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }

  labels = local.common_labels
}

# Allow unauthenticated access to Cloud Run
resource "google_cloud_run_v2_service_iam_member" "public" {
  count    = var.deploy_to_cloud_run ? 1 : 0
  location = google_cloud_run_v2_service.portfolio[0].location
  name     = google_cloud_run_v2_service.portfolio[0].name
  role     = "roles/run.invoker"
  member   = "allUsers"
  project  = var.project_id
}

# -----------------------------------------------------------------------------
# Cloud Armor Security Policy (DDoS Protection)
# -----------------------------------------------------------------------------
resource "google_compute_security_policy" "portfolio" {
  name    = "${local.app_name}-security-policy"
  project = var.project_id

  # Default rule - allow all
  rule {
    action   = "allow"
    priority = "2147483647"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    description = "Default rule, allow all traffic"
  }

  # Block known bad IPs
  rule {
    action   = "deny(403)"
    priority = "1000"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('xss-stable')"
      }
    }
    description = "Block XSS attacks"
  }

  # Rate limiting
  rule {
    action   = "throttle"
    priority = "2000"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    rate_limit_options {
      conform_action = "allow"
      exceed_action  = "deny(429)"
      rate_limit_threshold {
        count        = 100
        interval_sec = 60
      }
    }
    description = "Rate limit all traffic"
  }
}

# -----------------------------------------------------------------------------
# Outputs
# -----------------------------------------------------------------------------
output "cluster_endpoint" {
  description = "GKE cluster endpoint"
  value       = google_container_cluster.primary.endpoint
  sensitive   = true
}

output "cluster_ca_certificate" {
  description = "GKE cluster CA certificate"
  value       = google_container_cluster.primary.master_auth[0].cluster_ca_certificate
  sensitive   = true
}

output "vpc_network" {
  description = "VPC network name"
  value       = google_compute_network.vpc.name
}

output "artifact_registry_url" {
  description = "Artifact Registry URL"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.portfolio.repository_id}"
}

output "cloud_run_url" {
  description = "Cloud Run service URL"
  value       = var.deploy_to_cloud_run ? google_cloud_run_v2_service.portfolio[0].uri : null
}
