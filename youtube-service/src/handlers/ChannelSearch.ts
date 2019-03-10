import { Request, Response } from 'express';
import { youtube_v3 } from 'googleapis';
import Handler from './Handler';

import yt from '../lib/yt';

interface Thumbnail {
  url?: string;
  width?: number;
  height?: number;
}

interface Channel {
  id: string;
  title: string;
  description: string;
  thumbnails: Map<string, Thumbnail>;
}

interface ChannelListResponse {
  status: number;
  channels: Array<Channel | undefined>;
  query: string;
  error?: any;
}

function channelSnippetToChannel(
  snippet: youtube_v3.Schema$SearchResultSnippet
): Channel {
  const { channelId, title, description, thumbnails } = snippet;

  const c: Channel = {
    id: channelId || '',
    title: title || '',
    description: description || '',
    thumbnails: Object.entries(thumbnails || {}).reduce((acc, [key, val]) => {
      return {
        ...acc,
        [key]: val,
      };
    }, new Map()),
  };

  return c;
}

export default class ChannelSearch extends Handler {
  protected route: string = '/channels';

  async handle(req: Request, res: Response) {
    const query: string = req.param('query');
    const channelResponse: ChannelListResponse = {
      status: 200,
      query: query,
      channels: [],
    };
    if (!query) {
      return res.json(channelResponse);
    }
    try {
      const channelSearchResult = await yt.search.list({
        part: 'snippet',
        type: 'channel',
        q: query,
      });
      if (channelSearchResult.data.items) {
        channelResponse.channels = channelSearchResult.data.items.map(
          channel => {
            if (channel && channel.snippet)
              return channelSnippetToChannel(channel.snippet);
          }
        );
      }
    } catch (e) {
      channelResponse.status = 500;
      channelResponse.error = e;
    }
    return res.json(channelResponse);
  }
}
