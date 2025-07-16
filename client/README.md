# Bridges Client

The Bridges client allows users to interactively browse societies, create events and seek potential sponsorships.

## Tech Stack

- [Node.js](https://nodejs.org/en)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Auth.js](https://authjs.dev/)
- [Docker](https://www.docker.com/) (optional)

## Pre-requisites

To run the server, you’ll need the following tools installed. The versions listed are the ones verified to work reliably with the server:

- Node.js v24.4
- NPM v11.4.2

Now install `pnpm` with the following command:

```sh
npm i -g pnpm
```

## Running the Client

We will present two different ways to run the project, either through Docker containers or locally. Both have their advantages and disadvantages.

Follow the most applicable instructions. Both configurations will run the client on port `3000`.

### Creating Environment Variables

The client is responsible for some authentication due to the ease of integration using `Next.js` with `Auth.js`. As such you will need to set some environment variables for the Auth secrets along with Google provider ID and secret.

`Auth.js` requires `AUTH_SECRET` to be set within the `.env` file. First generate this value by running

```sh
npx auth secret
```

This will create a `.env` file in your current directory. Rename this file to `client.env`. In the root directory of Bridges, create a folder named `env/`. Place the `client.env` file we generated into this folder.

You will then need to obtain values for `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`. Follow [this guide](https://developers.google.com/identity/protocols/oauth2) to create a project and obtain a OAuth 2.0 Client ID. Once this is created you will have a generated `Client ID` and `Client secret`. These correspond to your `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` variables respectively. Copy these into your `client.env` file using the standard format.

### Without Docker

First navigate to the `client/` directory (where you are reading this) with `cd client/`.

You will then need to manually install dependencies by first running

```sh
pnpm install
```

then you can run the app in `dev` mode with the following command

```sh
pnpm run dev
```

this will run `next dev` which will watch for changes to the codebase and automatically restart the server with the newly applied changes.

### With Docker

Navigate to the root directory and run

```sh
docker compose up client-dev
```

and it's as simple as that! This will create an image based on the configuration in [dev.dockerfile](./dev.dockerfile) which installs dependencies then runs the project in dev mode. Allowing for auto-updates to the server. Note that this will also build the database and server.
