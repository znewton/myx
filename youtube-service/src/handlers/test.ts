import { Request, Response } from 'express';
import Handler from './Handler';

export class TestHandler extends Handler {
  protected route: string = '/test';

  handle(req: Request, res: Response) {
    res.json({ origin: req.hostname });
  }
}
