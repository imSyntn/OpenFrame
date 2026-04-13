FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS prepare
RUN npm install -g turbo
COPY . .
RUN turbo prune worker-image-processor --docker

FROM base AS builder
COPY --from=prepare /app/out/json/ .
RUN pnpm install
COPY --from=prepare /app/out/full/ .

RUN pnpm --filter worker-image-processor build

FROM base AS runner
RUN addgroup --system --gid 1001 worker
RUN adduser --system --uid 1001 image-processor

USER image-processor

COPY --from=builder --chown=image-processor:worker /app /app

WORKDIR /app/apps/worker-image-processor

CMD ["node", "dist/index.js"]