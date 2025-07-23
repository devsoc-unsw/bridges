FROM node:24.4.0-alpine AS base

# Set up pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set working directory and entire project into the container
WORKDIR /server
COPY . .

# Run database migration
FROM base AS migration
RUN pnpm install --frozen-lockfile
RUN [ "pnpm", "run", "migrate" ]

# Install dependencies
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Build project
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Run build
FROM base
COPY --from=prod-deps /server/node_modules /server/node_modules
COPY --from=build /server/dist /server/dist
ENV NODE_ENV=production
EXPOSE 3001
ENV PORT=3001
CMD [ "node", "dist/server.js" ]