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

- Node.js 20+
- pnpm
- PostgreSQL
- Kafka
- Redis
- S3 compatible storage
- Upstash Search keys (for search functionality)
- Google OAuth keys (for google login)
- SMTP server (for password reset and verification badge emails)

## Running the Project

This project can be run using **two approaches**:

- Manual setup (this branch)
- Docker setup (available in [`docker-setup`](https://github.com/imSyntn/OpenFrame/tree/docker-setup?tab=readme-ov-file#docker-setup-branch) branch)

---

### 1. Setup Environment Variables

Rename `.env.example` to `.env` and update values.

### 2. Run the Application

```bash
# install dependencies
pnpm install

# setup everything (DB migration, Prisma client generation, DB seeding, Kafka topics creation)
pnpm setup

# build all apps including packages
pnpm build

# start dev server
pnpm dev

# start production build
pnpm start
```

### 3. Access the Application

Once all services are running:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000/api/health

## Scripts

```bash
pnpm dev        # run all apps in dev mode
pnpm build      # build all apps including packages
pnpm start      # start production build
pnpm setup      # setup everything (DB migration, Prisma client generation, DB seeding, Kafka topics creation)
pnpm db:generate # generate Prisma client
pnpm db:migrate # run DB migration
pnpm db:seed     # seed the database
```
