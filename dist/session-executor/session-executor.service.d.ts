import { Request, Response } from 'express';
declare module 'express-session' {
    interface SessionData {
        loggedInUser: string;
        adminEmail: string;
    }
}
export declare class SessionExecutorService {
    static callTimes: number;
    constructor();
    sessionExecutor(req: Request, res: Response, ifLoggedIn: () => any, ifNotLoggedIn: () => any): void;
    adminSessionExecutor(req: Request, res: Response, ifLoggedIn: () => any, ifNotLoggedIn: () => any): void;
}
