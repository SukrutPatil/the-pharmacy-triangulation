import { ModuleService } from './module.service';
import { Request, Response } from 'express';
export declare class ModuleController {
    private readonly ms;
    constructor(ms: ModuleService);
    getModuleById(id: string, res: Response, req: Request): Promise<void>;
}
