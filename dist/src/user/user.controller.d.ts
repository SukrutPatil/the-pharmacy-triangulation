import { SessionExecutorService } from '../session-executor/session-executor.service';
import { Request, Response } from 'express';
import { ModuleService } from '../module/module.service';
export declare class UserController {
    private readonly se;
    private readonly ms;
    constructor(se: SessionExecutorService, ms: ModuleService);
    getAllModules(req: Request, res: Response): any;
    getMedicationCounseling(req: Request, res: Response): Promise<any>;
    getMedicationSession(req: Request, res: Response): any;
    getEntrepreneurshipCounseling(req: Request, res: Response): Promise<any>;
    getEntrepreneurshipSession(req: Request, res: Response): any;
    getCareerCounseling(req: Request, res: Response): Promise<void>;
    getCareerSession(req: Request, res: Response): any;
    getDietCounseling(req: Request, res: Response): Promise<void>;
    getDietSession(req: Request, res: Response): any;
    getProducts(req: Request, res: Response): any;
    getArticle(req: Request, res: Response): any;
    getUserDashboard(req: Request, res: Response): void;
    getUserOrders(req: Request, res: Response): void;
}
