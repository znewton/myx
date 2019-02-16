# myx

Redo of myx-client and myx-api in one repo and with better everything.

## Developing

This repo is set-up as a monorepo.

No matter which portion you are working on, be sure to install dependencies within the fold you are developing on.

```shell
npm install
```

### `client/`

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

### `youtube-service/`
