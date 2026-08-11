output "alb_dns_name" {
  description = "Application Load Balancer Endpoint URL"
  value       = module.alb.alb_dns_name
}

output "frontend_website_url" {
  description = "S3 Static Web Hosting URL (Bypassing CloudFront)"
  value       = "http://${module.s3.frontend_bucket_website_endpoint}"
}

output "backend_ecr_repository_url" {
  description = "Amazon ECR Backend Repository URL"
  value       = module.ecr.backend_repository_url
}

output "frontend_ecr_repository_url" {
  description = "Amazon ECR Frontend Repository URL"
  value       = module.ecr.frontend_repository_url
}

output "rds_endpoint" {
  description = "Amazon RDS PostgreSQL Private Endpoint"
  value       = module.rds.db_instance_endpoint
}

output "s3_attachment_bucket" {
  description = "Amazon S3 Ticket Attachments Bucket"
  value       = module.s3.attachment_bucket_name
}
