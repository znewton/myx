# myx

Redo of myx-client and myx-api in one repo and with better everything.

## Developing

This repo is set-up as a monorepo.

No matter which portion you are working on, be sure to install dependencies within the fold you are developing on.

```shell
npm install
```

### `client/`

Create a firebase project and store the given API Key in `.env`

```
touch .env
echo "FIREBASE_API_KEY=your_api_key_here" >> .env
```

Compile and run at [localhost:8080](https://localhost:8080)

```
npm run dev
```

### `data-service/`

Make sure you have [Docker](https://docker.com) installed, along with [Docker-Compose](https://docs.docker.com/compose/).

Globally install [Prisma](https://prisma.io) and [graphqlgen](https://oss.prisma.io/graphqlgen/).

```shell
npm i -g prisma graphqlgen
```

Start the docker services

```shell
docker-compose up -d
```

> **Note:** if you're running into troubles with docker, try rebooting your computer.

Deploy the Prisma API

```shell
prisma deploy
```

Access the prisma server at [localhost:4466](https://localhost:4466) (shows as a graphql playground in your browser)

To serve the GraphQL API, run

```shell
npm run start
```

### `youtube-service/`

Obtain a [YouTube Data API v3 Key](https://developers.google.com/youtube/registering_an_application) and add to `.env`

```
touch .env
echo "YOUTUBE_API_KEY=your_api_key_here" >> .env
```

Run the dev server at [localhost:3366](https://localhost:3366)

```
npm run start
```

