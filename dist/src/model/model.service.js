"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ModelService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelService = exports.ModuleType = void 0;
const common_1 = require("@nestjs/common");
const crypticKeyGenerator = require("crypto-random-string");
const security_service_1 = require("../security/security.service");
const dateFetch = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
};
var ModuleType;
(function (ModuleType) {
    ModuleType[ModuleType["DIET"] = 0] = "DIET";
    ModuleType[ModuleType["CAREER"] = 1] = "CAREER";
    ModuleType[ModuleType["ENTREPRENEURSHIP"] = 2] = "ENTREPRENEURSHIP";
    ModuleType[ModuleType["MEDICATION"] = 3] = "MEDICATION";
})(ModuleType = exports.ModuleType || (exports.ModuleType = {}));
var RandomIdType;
(function (RandomIdType) {
    RandomIdType[RandomIdType["TRANSACTION"] = 0] = "TRANSACTION";
    RandomIdType[RandomIdType["PRODUCT"] = 1] = "PRODUCT";
    RandomIdType[RandomIdType["MODULE"] = 2] = "MODULE";
    RandomIdType[RandomIdType["ARTICLE"] = 3] = "ARTICLE";
    RandomIdType[RandomIdType["SESSION"] = 4] = "SESSION";
    RandomIdType[RandomIdType["CHAT"] = 5] = "CHAT";
    RandomIdType[RandomIdType["ADDRESS"] = 6] = "ADDRESS";
})(RandomIdType || (RandomIdType = {}));
let ModelService = ModelService_1 = class ModelService {
    constructor(securityService) {
        this.securityService = securityService;
        this.createAddressObject = (al1, al2, al3, pincode) => {
            al2 = al2 ? al2 : ' ';
            return { id: this.generateUniqueID(RandomIdType.ADDRESS), al1, al2, al3, pincode };
        };
        this.createArticleObject = (name, publisher, about, admin, thumbnail, otherimages) => {
            const id = this.generateUniqueID(RandomIdType.ARTICLE);
            const dop = dateFetch();
            return { id, about, admin, name, otherimages, publisher, thumbnail, dop };
        };
        this.createUserObject = (username, email, password, memtype, phoneno) => {
            return { username, email, password, memtype: memtype.split(','), phoneno };
        };
        this.createMemberObject = (name, email, phone, pwd, membershipType, isAdmin) => {
            isAdmin = isAdmin ? 'YES' : 'NO';
            const password = this.securityService.secureData(`${name}${email}`, pwd);
            return {
                name,
                email,
                phone,
                password,
                membershipType,
                isAdmin,
            };
        };
        this.createChatObject = (moduleid, sender, chat) => {
            return {
                chatid: this.generateUniqueID(RandomIdType.CHAT),
                moduleid,
                sender,
                chat,
            };
        };
        this.createDrugObject = (name, brand_name, brand_code, strength, qty, packing, manufacturer, marketedby, batch_number, hsn_code, mfg_date, exp_date, product_mrp, product_purchase_price, product_rate, product_sgst, product_cgst, product_cost_var, product_sku, imgaddress, adminemail) => {
            const id = this.generateUniqueID(RandomIdType.PRODUCT);
            return {
                id: id,
                name: name,
                brandName: brand_name,
                batchno: batch_number,
                brandCode: brand_code,
                cgst: product_cgst,
                costvar: product_cost_var,
                expdate: exp_date,
                hsncode: hsn_code,
                manufacturer: manufacturer,
                marketedby: marketedby,
                mfgdate: mfg_date,
                mrp: product_mrp,
                packing: packing,
                purchaseprice: product_purchase_price,
                qty: qty,
                rate: product_rate,
                sgst: product_sgst,
                sku: product_sku,
                strnth: strength,
                imgaddress: imgaddress,
                adminemail: adminemail,
            };
        };
        this.createModuleObject = (name, description, price, category, thumbnail, video, articletitle, article, adminEmail) => {
            const id = this.generateUniqueID(RandomIdType.MODULE);
            const dop = dateFetch();
            return {
                id,
                adminEmail,
                article,
                articletitle,
                category,
                description,
                dop,
                name,
                price,
                thumbnail,
                video,
            };
        };
        this.createTransactionObject = (buyerName, address, phone, email, product_id) => {
            const transactionId = this.generateUniqueID(RandomIdType.TRANSACTION);
            return { transactionId, address, buyerName, email, phone, product_id };
        };
        this.generateUniqueID = (rt) => {
            let prefix;
            switch (rt) {
                case RandomIdType.PRODUCT:
                    prefix = `PRO`;
                    break;
                case RandomIdType.MODULE:
                    prefix = `MOD`;
                    break;
                case RandomIdType.TRANSACTION:
                    prefix = `TRS`;
                    break;
                case RandomIdType.ARTICLE:
                    prefix = `ART`;
                    break;
                case RandomIdType.SESSION:
                    prefix = 'SESS';
                    break;
                case RandomIdType.CHAT:
                    prefix = 'CHAT';
                    break;
                case RandomIdType.ADDRESS:
                    prefix = 'ADDR';
                    break;
            }
            const suffix = crypticKeyGenerator({ length: 7 }) + Date.now().toString();
            return `${prefix}${suffix}`;
        };
        console.debug(`ModelService ${ModelService_1.callTimes++}`);
    }
};
ModelService.callTimes = 0;
ModelService = ModelService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [security_service_1.SecurityService])
], ModelService);
exports.ModelService = ModelService;
//# sourceMappingURL=model.service.js.map