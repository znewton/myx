import { google, youtube_v3 } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

const yt: youtube_v3.Youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export default yt;
