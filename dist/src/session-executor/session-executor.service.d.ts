import { Request, Response } from 'express';
export declare class SessionExecutorService {
    static callTimes: number;
    constructor();
    sessionExecutor(req: Request, res: Response, ifLoggedIn: () => any, ifNotLoggedIn: () => any): void;
    adminSessionExecutor(req: Request, res: Response, ifLoggedIn: () => any, ifNotLoggedIn: () => any): void;
}
