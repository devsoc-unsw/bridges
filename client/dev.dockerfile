FROM node:24.4.0-alpine

# Set up pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the current working directory inside the container
WORKDIR /client

# Copy entire project into the container
COPY . .

# Install dependencies inside container based on pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Setting node environment and exposing port
ENV NODE_ENV=development
EXPOSE 3000
ENV PORT=3000

# Run the server
CMD ["pnpm", "run", "dev"]