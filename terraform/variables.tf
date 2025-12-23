# =============================================================================
# Terraform Variables for Portfolio Infrastructure
# =============================================================================

# -----------------------------------------------------------------------------
# Project Configuration
# -----------------------------------------------------------------------------
variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP region for resources"
  type        = string
  default     = "europe-west1"
}

variable "zone" {
  description = "GCP zone for zonal resources"
  type        = string
  default     = "europe-west1-b"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod."
  }
}

# -----------------------------------------------------------------------------
# Network Configuration
# -----------------------------------------------------------------------------
variable "subnet_cidr" {
  description = "CIDR range for the subnet"
  type        = string
  default     = "10.0.0.0/20"
}

variable "pods_cidr" {
  description = "CIDR range for GKE pods"
  type        = string
  default     = "10.1.0.0/16"
}

variable "services_cidr" {
  description = "CIDR range for GKE services"
  type        = string
  default     = "10.2.0.0/20"
}

variable "master_cidr" {
  description = "CIDR range for GKE master nodes"
  type        = string
  default     = "172.16.0.0/28"
}

# -----------------------------------------------------------------------------
# GKE Configuration
# -----------------------------------------------------------------------------
variable "enable_autopilot" {
  description = "Enable GKE Autopilot mode"
  type        = bool
  default     = true
}

variable "node_machine_type" {
  description = "Machine type for GKE nodes (Standard mode only)"
  type        = string
  default     = "e2-medium"
}

variable "min_node_count" {
  description = "Minimum number of nodes per zone"
  type        = number
  default     = 1
}

variable "max_node_count" {
  description = "Maximum number of nodes per zone"
  type        = number
  default     = 3
}

# -----------------------------------------------------------------------------
# Application Configuration
# -----------------------------------------------------------------------------
variable "container_image" {
  description = "Container image to deploy"
  type        = string
  default     = "ghcr.io/nithin-thadem/nt-portfolio:latest"
}

variable "deploy_to_cloud_run" {
  description = "Deploy to Cloud Run instead of GKE"
  type        = bool
  default     = false
}

# -----------------------------------------------------------------------------
# Domain Configuration
# -----------------------------------------------------------------------------
variable "domain_name" {
  description = "Domain name for the portfolio"
  type        = string
  default     = "thademinfra.tech"
}

# -----------------------------------------------------------------------------
# Monitoring Configuration
# -----------------------------------------------------------------------------
variable "enable_monitoring" {
  description = "Enable Cloud Monitoring"
  type        = bool
  default     = true
}

variable "alert_email" {
  description = "Email address for alerts"
  type        = string
  default     = ""
}
