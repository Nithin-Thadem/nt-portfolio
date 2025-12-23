# =============================================================================
# Makefile for Portfolio DevOps Operations
# Author: Nithin Thadem
# =============================================================================

.PHONY: help install dev build test lint docker-build docker-run docker-push \
        terraform-init terraform-plan terraform-apply k8s-deploy clean

# Default target
.DEFAULT_GOAL := help

# Variables
IMAGE_NAME := ghcr.io/nithin-thadem/nt-portfolio
IMAGE_TAG := $(shell git rev-parse --short HEAD)
DOCKER_PLATFORM := linux/amd64,linux/arm64

# Colors for output
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

# =============================================================================
# Help
# =============================================================================
help: ## Show this help message
	@echo "$(GREEN)Portfolio DevOps Commands$(NC)"
	@echo "=========================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

# =============================================================================
# Development
# =============================================================================
install: ## Install dependencies
	@echo "$(GREEN)Installing dependencies...$(NC)"
	npm ci

dev: ## Start development server
	@echo "$(GREEN)Starting development server...$(NC)"
	npm run dev

build: ## Build production bundle
	@echo "$(GREEN)Building production bundle...$(NC)"
	npm run build

test: ## Run tests
	@echo "$(GREEN)Running tests...$(NC)"
	npm test || echo "No tests configured"

lint: ## Run linter
	@echo "$(GREEN)Running linter...$(NC)"
	npm run lint

lint-fix: ## Fix linting issues
	@echo "$(GREEN)Fixing linting issues...$(NC)"
	npm run lint -- --fix

# =============================================================================
# Docker Operations
# =============================================================================
docker-build: ## Build Docker image
	@echo "$(GREEN)Building Docker image...$(NC)"
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) -t $(IMAGE_NAME):latest --target production .

docker-build-dev: ## Build Docker development image
	@echo "$(GREEN)Building Docker development image...$(NC)"
	docker build -t $(IMAGE_NAME):dev --target development .

docker-run: ## Run Docker container locally
	@echo "$(GREEN)Running Docker container...$(NC)"
	docker run -d -p 8080:8080 --name portfolio $(IMAGE_NAME):latest

docker-run-dev: ## Run Docker development container
	@echo "$(GREEN)Running Docker development container...$(NC)"
	docker run -d -p 5173:5173 -v $(PWD):/app --name portfolio-dev $(IMAGE_NAME):dev

docker-stop: ## Stop Docker container
	@echo "$(YELLOW)Stopping Docker container...$(NC)"
	docker stop portfolio portfolio-dev 2>/dev/null || true
	docker rm portfolio portfolio-dev 2>/dev/null || true

docker-push: ## Push Docker image to registry
	@echo "$(GREEN)Pushing Docker image to registry...$(NC)"
	docker push $(IMAGE_NAME):$(IMAGE_TAG)
	docker push $(IMAGE_NAME):latest

docker-scan: ## Scan Docker image for vulnerabilities
	@echo "$(GREEN)Scanning Docker image...$(NC)"
	docker scout cves $(IMAGE_NAME):latest || trivy image $(IMAGE_NAME):latest

# =============================================================================
# Docker Compose
# =============================================================================
compose-up: ## Start all services with docker-compose
	@echo "$(GREEN)Starting services...$(NC)"
	docker-compose up -d

compose-up-dev: ## Start development environment
	@echo "$(GREEN)Starting development environment...$(NC)"
	docker-compose up -d dev

compose-up-prod: ## Start production environment
	@echo "$(GREEN)Starting production environment...$(NC)"
	docker-compose up -d production

compose-up-monitoring: ## Start with monitoring stack
	@echo "$(GREEN)Starting with monitoring...$(NC)"
	docker-compose --profile monitoring up -d

compose-down: ## Stop all services
	@echo "$(YELLOW)Stopping services...$(NC)"
	docker-compose down

compose-logs: ## View logs
	docker-compose logs -f

# =============================================================================
# Terraform Operations
# =============================================================================
terraform-init: ## Initialize Terraform
	@echo "$(GREEN)Initializing Terraform...$(NC)"
	cd terraform && terraform init

terraform-fmt: ## Format Terraform files
	@echo "$(GREEN)Formatting Terraform files...$(NC)"
	cd terraform && terraform fmt -recursive

terraform-validate: ## Validate Terraform configuration
	@echo "$(GREEN)Validating Terraform...$(NC)"
	cd terraform && terraform validate

terraform-plan: ## Plan Terraform changes
	@echo "$(GREEN)Planning Terraform changes...$(NC)"
	cd terraform && terraform plan -out=tfplan

terraform-apply: ## Apply Terraform changes
	@echo "$(GREEN)Applying Terraform changes...$(NC)"
	cd terraform && terraform apply tfplan

terraform-destroy: ## Destroy Terraform resources
	@echo "$(RED)Destroying Terraform resources...$(NC)"
	cd terraform && terraform destroy

# =============================================================================
# Kubernetes Operations
# =============================================================================
k8s-deploy: ## Deploy to Kubernetes
	@echo "$(GREEN)Deploying to Kubernetes...$(NC)"
	kubectl apply -f k8s/

k8s-delete: ## Delete Kubernetes resources
	@echo "$(RED)Deleting Kubernetes resources...$(NC)"
	kubectl delete -f k8s/

k8s-status: ## Check Kubernetes deployment status
	@echo "$(GREEN)Checking deployment status...$(NC)"
	kubectl get pods,svc,ingress -l app=portfolio

k8s-logs: ## View pod logs
	kubectl logs -f -l app=portfolio

k8s-rollout-status: ## Check rollout status
	kubectl rollout status deployment/portfolio

k8s-rollback: ## Rollback to previous version
	@echo "$(YELLOW)Rolling back deployment...$(NC)"
	kubectl rollout undo deployment/portfolio

# =============================================================================
# CI/CD Helpers
# =============================================================================
ci-lint: ## Run CI linting checks
	@echo "$(GREEN)Running CI linting...$(NC)"
	npm run lint
	cd terraform && terraform fmt -check -recursive

ci-security: ## Run security checks
	@echo "$(GREEN)Running security checks...$(NC)"
	npm audit --audit-level=moderate
	trivy fs --security-checks vuln,config .

ci-build: ## CI build process
	@echo "$(GREEN)Running CI build...$(NC)"
	npm ci
	npm run build
	docker build -t $(IMAGE_NAME):ci --target production .

# =============================================================================
# Cleanup
# =============================================================================
clean: ## Clean build artifacts
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	rm -rf dist node_modules/.cache
	docker system prune -f

clean-all: clean docker-stop ## Clean everything including containers
	@echo "$(YELLOW)Cleaning all...$(NC)"
	rm -rf node_modules
	docker rmi $(IMAGE_NAME):latest $(IMAGE_NAME):$(IMAGE_TAG) 2>/dev/null || true

# =============================================================================
# Information
# =============================================================================
info: ## Show project information
	@echo "$(GREEN)Project Information$(NC)"
	@echo "===================="
	@echo "Image: $(IMAGE_NAME)"
	@echo "Tag: $(IMAGE_TAG)"
	@echo "Platform: $(DOCKER_PLATFORM)"
	@echo ""
	@echo "$(GREEN)Versions$(NC)"
	@echo "========="
	@node --version 2>/dev/null || echo "Node.js not installed"
	@npm --version 2>/dev/null || echo "npm not installed"
	@docker --version 2>/dev/null || echo "Docker not installed"
	@kubectl version --client --short 2>/dev/null || echo "kubectl not installed"
	@terraform version 2>/dev/null | head -1 || echo "Terraform not installed"
