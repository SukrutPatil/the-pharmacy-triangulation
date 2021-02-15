import { Request, Response } from 'express';
export declare class SessionExecutorService {
    sessionExecutor(req: Request, res: Response, ifLoggedIn: () => any, ifNotLoggedIn: () => any): void;
    adminSessionExecutor(req: Request, res: Response, ifLoggedIn: () => any, ifNotLoggedIn: () => any): void;
}
