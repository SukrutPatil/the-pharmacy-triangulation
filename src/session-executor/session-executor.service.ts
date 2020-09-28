import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class SessionExecutorService {
  /** Basic User Session Based Function Executor */
  sessionExecutor(
    req: Request,
    res: Response,
    ifLoggedIn: () => any,
    ifNotLoggedIn: () => any,
  ): void {
    if (req.session.loggedInUser) ifLoggedIn();
    else ifNotLoggedIn();
  }
  /** Admin User Session Based Function Executor */
  adminSessionExecutor(
    req: Request,
    res: Response,
    ifLoggedIn: () => any,
    ifNotLoggedIn: () => any,
  ): void {
    req.session.adminEmail ? ifLoggedIn() : ifNotLoggedIn();
  }
}
