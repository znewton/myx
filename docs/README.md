# myx

Redo of myx-client and myx-api in one repo and with better everything.

## Developing

This repo is set-up as a monorepo.

No matter which portion you are working on, be sure to install dependencies within the fold you are developing on.

```shell
npm install
```

### `client/`

Compile and run at [localhost:8080](https://localhost:8080)

```
npm run dev
```

### `user-service/`

Make sure you have [Docker](https://docker.com) installed, along with [Docker-Compose](https://docs.docker.com/compose/).

Globally install [Prisma](https://prisma.io).

```shell
npm i -g Prisma
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

Access the dev server at [localhost:4466](https://localhost:4466)

### `youtube-service/`

Obtain a [YouTube Data API v3 Key](https://developers.google.com/youtube/registering_an_application) and add to `.env`

```
touch .env
echo "YOUTUBE_API_KEY=your_api_key_here" >> .env
```

Run the dev server at [localhost:3366](https://localhost:3366)

```
npm run dev
```

