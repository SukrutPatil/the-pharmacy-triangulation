import { Request, Response } from 'express';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { ProductsService } from './products/products.service';
export declare class AppController {
    private readonly db;
    private readonly ps;
    private readonly as;
    constructor(db: DatabaseService, ps: ProductsService, as: AppService);
    getHomePage(req: Request, res: Response): Promise<any>;
    getListOfAllProductsPage(res: Response): Promise<void>;
    getAboutUSPage(): any;
}
