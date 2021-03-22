import { ProductsService } from './products.service';
import { Response } from 'express';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getProductById(res: Response, id: string): Promise<{
        product: any;
    }>;
    getProductInfo(id: string): Promise<{
        product: any;
    }>;
}
