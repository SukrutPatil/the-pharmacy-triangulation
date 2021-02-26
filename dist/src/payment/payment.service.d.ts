import { ProductsService } from 'src/products/products.service';
export declare class PaymentService {
    private readonly productsService;
    rzp: any;
    constructor(productsService: ProductsService);
    generateOrderIdForProduct(product_id: string, amt: number): Promise<any>;
    getCheckoutOptionsForProduct(product_id: string): Promise<{
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
    }>;
    private getProductPrice;
    private generateRecieptId;
}
