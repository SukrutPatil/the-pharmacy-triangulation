import { DatabaseService } from '../database/database.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly DBService;
    constructor(DBService: DatabaseService);
    getLoginPage(): any;
    getSignupPage(): void;
    postLoginInformation(req: Request, res: Response): Promise<any>;
    getMembersipForm(req: Request, res: Response): any;
    signoutAction(req: Request, res: Response): any;
}
