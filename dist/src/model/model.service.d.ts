import { SecurityService } from '../security/security.service';
export declare enum ModuleType {
    DIET = 0,
    CAREER = 1,
    ENTREPRENEURSHIP = 2,
    MEDICATION = 3
}
export interface RzpProdUnit {
    rzptrid: string;
    user: string;
    addressid: string;
    time: string;
    prodid: string;
}
export interface Drug {
    name: string;
    id: any;
    brandName: any;
    brandCode: any;
    strnth: any;
    qty: any;
    packing: any;
    sku: any;
    manufacturer: any;
    marketedby: any;
    batchno: any;
    hsncode: any;
    mfgdate: any;
    expdate: any;
    mrp: any;
    purchaseprice: any;
    rate: any;
    sgst: any;
    cgst: any;
    costvar: any;
    imgaddress: string;
    adminemail: string;
}
export interface Address {
    id: string;
    al1: string;
    al2?: string;
    al3: string;
    pincode: string;
}
export interface Member {
    name: string;
    email: string;
    phone: any;
    password: string;
    membershipType: Array<string>;
    isAdmin?: string;
}
export interface Transaction {
    transactionId: string;
    buyerName: string;
    address: string;
    phone: number;
    email: string;
    product_id: string;
}
export interface Article {
    id: string;
    name: string;
    publisher: string;
    about: string;
    admin: string;
    thumbnail: string;
    otherimages: string;
    dop: string;
}
export interface Module {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    thumbnail: string;
    video: string;
    articletitle: string;
    article: string;
    adminEmail: string;
    dop: string;
}
export interface User {
    userid: string;
    username: string;
    password: string;
    memtype: string[];
    phoneno: number;
    email: string;
}
export interface Chat {
    moduleid: string;
    sender: string;
    chatid: string;
    chat: string;
}
export declare class ModelService {
    private securityService;
    static callTimes: number;
    constructor(securityService: SecurityService);
    createAddressObject: (al1: string, al2: string, al3: string, pincode: string) => Address;
    createArticleObject: (name: string, publisher: string, about: string, admin: string, thumbnail: string, otherimages: string) => Article;
    createUserObject: (username: string, email: string, password: string, memtype: string, phoneno: number) => {
        username: string;
        email: string;
        password: string;
        memtype: string[];
        phoneno: number;
    };
    createMemberObject: (name: string, email: string, phone: number, pwd: string, membershipType: Array<string>, isAdmin?: string) => Member;
    createChatObject: (moduleid: string, sender: string, chat: string) => {
        chatid: string;
        moduleid: string;
        sender: string;
        chat: string;
    };
    createDrugObject: (name: string, brand_name: string, brand_code: string, strength: string, qty: string, packing: string, manufacturer: string, marketedby: string, batch_number: string, hsn_code: string, mfg_date: string, exp_date: string, product_mrp: string, product_purchase_price: string, product_rate: string, product_sgst: string, product_cgst: string, product_cost_var: string, product_sku: string, imgaddress: string, adminemail: string) => Drug;
    createModuleObject: (name: string, description: string, price: string, category: string, thumbnail: string, video: string, articletitle: string, article: string, adminEmail: string) => Module;
    createTransactionObject: (buyerName: string, address: string, phone: number, email: string, product_id: string) => Transaction;
    private generateUniqueID;
}
