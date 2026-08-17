terraform {
  backend "s3" {
    bucket  = "ticketdesk-terraform-state-051084216938"
    key     = "ticketdesk/prod/terraform.tfstate"
    region  = "eu-north-1"
    encrypt = true
  }
}