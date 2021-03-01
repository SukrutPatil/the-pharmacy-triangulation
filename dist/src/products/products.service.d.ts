import { DatabaseService } from '../database/database.service';
export declare class ProductsService {
    private readonly dbService;
    static callTimes: number;
    constructor(dbService: DatabaseService);
    getAllProducts(): Promise<any>;
    getParticularProduct(id: string): Promise<any>;
}
