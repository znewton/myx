import { Request, Response } from 'express';
import Handler from './Handler';

import yt from '../lib/yt';

interface ChannelResponse {
  status: number;
  channels: Array<any>;
  query: string;
  error?: any;
}

export default class ChannelSearch extends Handler {
  protected route: string = '/channels';

  async handle(req: Request, res: Response) {
    const query: string = req.param('query');
    const channelResponse: ChannelResponse = {
      status: 200,
      query: query,
      channels: [],
    };
    if (!query) {
      return res.json(channelResponse);
    }
    try {
      const channels = await yt.search.list({
        part: 'snippet',
        type: 'channel',
        q: query,
      });
      channelResponse.channels = channels.data.items || [];
    } catch (e) {
      channelResponse.status = 500;
      channelResponse.error = e;
    }
    return res.json(channelResponse);
  }
}
