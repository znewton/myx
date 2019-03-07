import { Router, Request, Response } from 'express';

export default class Handler {
  protected route: string = '/';
  protected router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  handle(req: Request, res: Response) {
    res.json({ message: ':)' });
  }

  mount() {
    this.router.get(this.route, this.handle);
  }
}
