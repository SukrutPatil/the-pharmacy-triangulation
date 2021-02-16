import { DatabaseService } from 'src/database/database.service';
import { ModelService, Address } from '../model/model.service';
export declare class ApiService {
    private readonly db;
    private readonly ms;
    static callTimes: number;
    session_address: Address;
    session_product_id: string;
    constructor(db: DatabaseService, ms: ModelService);
    getChats(moduleId: string): Promise<any[]>;
    updateChat(moduleId: string, chatter: string, chat: string): Promise<boolean>;
    newMember({ name, email, phone, password, type }: {
        name: any;
        email: any;
        phone: any;
        password: any;
        type: any;
    }): Promise<void>;
    saveAddress(al1: string, al2: string, al3: string, pincode: string): Promise<boolean>;
}
