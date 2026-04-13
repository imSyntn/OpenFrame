<p align="center">
  <img src="./docs/images/logo.png" width="200" alt="OpenFrame Logo" />
</p>

<p align="center">

**An image-sharing platform built with a modern full-stack architecture.**

</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" /></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white" /></a>
  <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" /></a>
  <a href="https://redis.io/"><img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" /></a>
  <a href="https://kafka.apache.org/"><img src="https://img.shields.io/badge/Kafka-231F20?style=flat-square&logo=apachekafka&logoColor=white" /></a>
  <a href="https://turbo.build/"><img src="https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&logo=turborepo&logoColor=white" /></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" /></a>
  <a href="https://upstash.com/"><img src="https://img.shields.io/badge/Upstash%20Search-000000?style=flat-square&logo=upstash&logoColor=white" /></a>
</p>

---

## Docker Setup Branch

This branch (`docker-setup`) is dedicated to running the project using Docker.

- If you want to run the project **manually (without Docker)** → use the `main` branch
- If you want a **fully containerized setup** → use this branch

This branch includes:

- Docker Compose setup (frontend, backend, workers, Kafka, Redis, PostgreSQL)
- One-time setup service for database and Kafka initialization
- Preconfigured environment for local development using Docker

## Features

- High-performance image upload & delivery
- Kafka-powered background processing (resize, metadata, analytics)
- Scalable database with Prisma + PostgreSQL
- Secure authentication
- Monorepo architecture with Turborepo
- Modular API with Node.js + Express
- Optimized frontend with Next.js

## Folder Structure

```text
apps/
  web/ # Frontend
  api/ # REST API
  worker-image-processor/ # Kafka consumers (background job - image processing)
  worker-image-metadata/ # Kafka consumers (background job - image metadata extraction)
  worker-image-finalize/ # Kafka consumers (background job - image finalization for DB write)
  worker-image-db-write/ # Kafka consumers (background job - image db write)
  worker-engagement-db-write/ # Kafka consumers (background job - engagement db write)

packages/
  lib/ # shared utilities (Prisma, Redis etc.)
  ui/ # shared UI components
  constants/ # shared constants
  types/ # shared types
  schema/ # shared schemas

setup/ # setup scripts
```

## Database ER Diagram

![ER Diagram](./docs/images/er-diagram.png)

## Kafka (Worker Flow)

![Architecture](./docs/images/architecture.png)

- API or workers produce events (image uploads, metadata extraction completed, image processing completed, image engagement events etc.)
- Workers consume events asynchronously

Workers handles:

- Image processing
- Metadata extraction
- Image finalization
- Uploading images to S3 and updating the database
- Updating image engagement (views, likes, downloads)

## Prerequisites

- Docker
- S3 compatible storage
- Upstash Search keys (for search functionality)
- Google OAuth keys (for google login)
- SMTP server (for password reset and verification badge emails)

## Running the application

This branch uses a **two-step Docker workflow**:

1. Run one-time setup (DB + Kafka + seed)
2. Start all services

### 1. Setup Environment Variables

Update the `docker.env` file in the root:

```env
UPSTASH_SEARCH_REST_URL="your_upstash_search_url"
UPSTASH_SEARCH_REST_TOKEN="your_upstash_search_token"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
SESSION_SECRET="your_session_secret"

JWT_ACCESS_SECRET="your_jwt_access_secret"
JWT_REFRESH_SECRET="your_jwt_refresh_secret"
JWT_VERIFICATION_SECRET="your_jwt_verification_secret"

SMTP_HOST="smtp.host"
SMTP_USER="username"
SMTP_PASS="password"

FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:4000"
NEXT_PUBLIC_BACKEND_URL="http://localhost:4000"

AWS_ACCESS_KEY_ID="your_aws_access_key_id"
AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
AWS_ENDPOINT_URL_S3="your_aws_s3_url"
AWS_ENDPOINT_URL_IAM="your_aws_endpoint_url_iam"
AWS_REGION="your_aws_region"
AWS_BUCKET_NAME="your_aws_bucket_name"
CDN_URL="your_cdn_url"
```

### 2. Run One-Time Setup

```bash
docker compose --profile setup run setup
```

This step:

- Syncs Prisma schema
- Generates Prisma client
- Seeds the database
- Creates Kafka topics and initializes search

> ⚠️ Run this only once (or after resetting volumes)

### 3. Start All Services

```bash
docker compose up -d
```

This will start:

- Frontend (Next.js)
- Backend (Express API)
- Kafka (Redpanda)
- Redis
- PostgreSQL
- All workers

### 4. Access the Application

Once all services are running:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000/api/health

### Reset Everything

```bash
docker compose down -v
```

This will:

- Stop all containers
- Remove containers
- Remove volumes (PostgreSQL data, Redis data etc.)
- Remove networks

Then re-run setup:

```bash
docker compose --profile setup run setup
```
