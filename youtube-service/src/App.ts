import * as express from 'express';
import * as cors from 'cors';

import Handler from './handlers/Handler';
import { TestHandler } from './handlers/TestHandler';
import ChannelSearch from './handlers/ChannelSearch';

class App {
  public express: any;
  private whitelist: Array<string | RegExp> = [
    /https?:\/\/localhost.*/,
    /https:\/\/myx\.znewton\.xyz.*/,
  ];

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();

    new Handler(router).mount();
    new TestHandler(router).mount();
    new ChannelSearch(router).mount();

    const corsOptions = {
      origin: (origin: string, callback: Function) => {
        if (!origin || this.whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error(`${origin} not allowed by CORS`));
        }
      },
    };

    this.express.options('*', cors(corsOptions));
    this.express.use(cors(corsOptions));
    this.express.use('/', router);
  }
}

export const app = new App().express;
