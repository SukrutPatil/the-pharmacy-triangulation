export declare class OrderService {
    getUserRelatedOrders(userEmail: string): Promise<any>;
    addTransactions(userEmail: string, transaction: any): Promise<void>;
}
