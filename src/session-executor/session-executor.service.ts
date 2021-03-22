import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
declare module 'express-session' {
  interface SessionData {
    loggedInUser: string;
    adminEmail: string;
  }
}
@Injectable()
export class SessionExecutorService {
  static callTimes = 0;
  constructor() {
    console.debug(
      `SessionExecutorService ${SessionExecutorService.callTimes++}`,
    );
  }
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
