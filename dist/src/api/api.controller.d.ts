import { ApiService } from './api.service';
import { Request } from 'express';
import { PaymentService } from 'src/payment/payment.service';
import { ModelService } from 'src/model/model.service';
import { DatabaseService } from 'src/database/database.service';
export declare class ApiController {
    private readonly apiService;
    private readonly paymentService;
    private readonly ms;
    private readonly db;
    constructor(apiService: ApiService, paymentService: PaymentService, ms: ModelService, db: DatabaseService);
    fetchCurrentChat(moduleId: string): Promise<{
        chats: any[];
    }>;
    updateChat(body: any, req: Request): Promise<{
        done: boolean;
    }>;
    newMember(body: any, req: Request): Promise<void>;
    getCheckoutForProduct(product_id: any): Promise<{
        checkoutOptions: {
            key: string;
            amount: number;
            currency: string;
            name: string;
            description: string;
            order: Promise<any>;
            callback_url: string;
            notes: {
                address: string;
            };
            theme: {
                color: string;
            };
        };
    }>;
    postPaymentOfProducts(body: any): Promise<{
        thanks: string;
    }>;
    saveAddress(body: any): Promise<{
        done: boolean;
    }>;
}
