FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS prepare
RUN npm install -g turbo
COPY . .
RUN turbo prune open-frame-backend --docker

FROM base AS builder
COPY --from=prepare /app/out/json/ .
RUN pnpm install
COPY --from=prepare /app/out/full/ .

RUN pnpm --filter open-frame-backend build

FROM base AS runner
RUN addgroup --system --gid 1001 backend
RUN adduser --system --uid 1001 api

USER api

COPY --from=builder --chown=api:backend /app /app

WORKDIR /app/apps/api

EXPOSE 4000

CMD ["node", "dist/server.js"]