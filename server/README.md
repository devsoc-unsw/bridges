# Bridges Server

The Bridges server handles requests to the database for the client side. Fetching information about societies, events and sponsorships.

The server also hosts and contains code relating to the database, migrations and types.

## Tech Stack

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Kysely](https://kysely.dev/)
- [Docker](https://www.docker.com/)

## Pre-requisites

To run the server, you’ll need the following tools installed. The versions listed are the ones verified to work reliably with the server:

- Node.js v24.4
- NPM v11.4.2
- Docker v28.3.0

Now install `pnpm` with the following command:

```sh
npm i -g pnpm
```

## Running the Database

Bridges uses Docker to host its Postgres database. This means you do not need to set anything the database manually and avoids the hassle of configuring Postgres locally.

You will need [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine and make sure the app is launched and stays open as long as you want you database to be active. To get started with Docker [read the docs](https://docs.docker.com/get-started/).

To run the database, simply navigate to the root directory of the project and run the following command.

```sh
docker compose up database -d
```

This will build the database image and container and on your Docker Desktop instance you will see an active database server hosted at port `5432`. The `-d` flag specifies detached mode, as we want to detach the database from our terminal.

## Running the Server

We will present two different ways to run the project, either through Docker containers or locally. Both have their advantages and disadvantages. Note you will still need Docker for the database.

Follow the most applicable instructions. Both configurations will run the server on port `3001`.

### Creating Environment Variables

The server needs to know which database it should connected to. To get started, in the root directory create a folder called `env`. Add a file named `server.env`.

If you wish to run the server locally add the following to `server.env`.

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/bridges
```

If you wish to run the server through Docker add the following to `server.env`.

```env
DATABASE_URL=postgres://postgres:postgres@database:5432/bridges
```

### Without Docker

First navigate to the `server/` directory (where you are reading this) with `cd server/`.

You will then need to manually install dependencies by first running

```sh
pnpm install
```

then you can run the app in `dev` mode with the following command

```sh
pnpm run dev
```

this will run `tsx watch` which will watch for changes to the codebase and automatically restart the server with the newly applied changes.

### With Docker

Navigate to the root directory and run

```sh
docker compose up server-dev
```

and it's as simple as that! This will create an image based on the configuration in [dev.dockerfile](./dev.dockerfile) which installs dependencies then runs the project in dev mode. Allowing for auto-updates to the server.

## How is it used?

The Bridges database and server provides various API endpoints that are used by the client project. This allows the client project to read information from the Postgres database. The server also defines APIs containing functions to read, write and update the database with necessary information.

See [API.md](../docs/API.md) for a complete list of the server's API endpoints.
