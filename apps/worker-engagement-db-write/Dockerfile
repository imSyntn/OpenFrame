FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS prepare
RUN npm install -g turbo
COPY . .
RUN turbo prune worker-engagement-db-write --docker

FROM base AS builder
COPY --from=prepare /app/out/json/ .
RUN pnpm install
COPY --from=prepare /app/out/full/ .

RUN pnpm --filter worker-engagement-db-write build

FROM base AS runner
RUN addgroup --system --gid 1001 worker
RUN adduser --system --uid 1001 engagement

USER engagement

COPY --from=builder --chown=engagement:worker /app /app

WORKDIR /app/apps/worker-engagement-db-write

CMD ["node", "dist/index.js"]