<img src="./docs/images/logo.png" width="200" />

---

An image-sharing platform built with a modern full-stack architecture:

- Next.js frontend
- Node.js API
- Kafka-based background workers
- Prisma + PostgreSQL
- Turborepo monorepo architecture

## Folder Structure

```text
apps/
  web/ # Next.js frontend
  api/ # REST API
  worker-image-processor/ # Kafka consumers (background jobs)
  worker-image-metadata/ # Kafka consumers (background jobs)
  worker-image-finalize/ # Kafka consumers (background jobs)
  worker-image-db-write/ # Kafka consumers (background jobs)
  worker-engagement-db-write/ # Kafka consumers (background jobs)

packages/
  lib/ # shared utilities (Prisma, Redis etc.)
  ui/ # shared UI components
  constants/ # shared constants
  types/ # shared types
  schema/ # shared schemas

setup/ # setup scripts
```

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL
- Kafka
- Redis
- S3 compatible storage
- Google OAuth
- SMTP server

## Running the Project

### 1. Setup Environment Variables

Rename `.env.example` to `.env` and update values.

### 2. Run the Application

```bash
# install dependencies
pnpm install

# setup everything (DB migration, Prisma client generation, DB seeding, Kafka topics creation)
pnpm setup

# build all apps
pnpm build

# start services
pnpm start
```

### 3. Access the Application

Once all services are running:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000/api/health

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

## Scripts

```bash
pnpm dev        # run all apps in dev mode
pnpm build      # build all apps
pnpm start      # start production build
```
