FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS prepare
RUN npm install -g turbo
COPY . .
RUN turbo prune worker-image-finalize --docker

FROM base AS builder
COPY --from=prepare /app/out/json/ .
RUN pnpm install
COPY --from=prepare /app/out/full/ .

RUN pnpm --filter worker-image-finalize build

FROM base AS runner
RUN addgroup --system --gid 1001 worker
RUN adduser --system --uid 1001 image-finalize

USER image-finalize

COPY --from=builder --chown=image-finalize:worker /app /app

WORKDIR /app/apps/worker-image-finalize

CMD ["node", "dist/index.js"]