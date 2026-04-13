FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS prepare
RUN npm install -g turbo
COPY . .
RUN turbo prune worker-image-metadata --docker

FROM base AS builder
COPY --from=prepare /app/out/json/ .
RUN pnpm install
COPY --from=prepare /app/out/full/ .

RUN pnpm --filter worker-image-metadata build

FROM base AS runner
RUN addgroup --system --gid 1001 worker
RUN adduser --system --uid 1001 image-metadata

USER image-metadata

COPY --from=builder --chown=image-metadata:worker /app /app

WORKDIR /app/apps/worker-image-metadata

CMD ["node", "dist/index.js"]