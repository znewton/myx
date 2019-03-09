import { Request, Response } from 'express';
import Handler from './Handler';

import yt from '../lib/yt';

export class TestHandler extends Handler {
  protected route: string = '/test';

  async handle(req: Request, res: Response) {
    try {
      const channelList: any = await yt.channels.list({
        part: 'snippet,contentDetails,statistics',
        forUsername: 'GoogleDevelopers',
      });
      res.json({ origin: req.hostname, channels: channelList });
    } catch (e) {
      res.status(500);
      res.json({ status: 500, error: e });
    }
  }
}
