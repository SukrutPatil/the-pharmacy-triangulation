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
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = exports.QueryStatus = exports.EntryType = void 0;
const common_1 = require("@nestjs/common");
const pgp = require("pg-promise");
const jsonData = require("../../DatabaseInfo.json");
var EntryType;
(function (EntryType) {
    EntryType[EntryType["PRODUCT"] = 0] = "PRODUCT";
    EntryType[EntryType["MODULE"] = 1] = "MODULE";
    EntryType[EntryType["TRANSACTION"] = 2] = "TRANSACTION";
    EntryType[EntryType["MEMBER"] = 3] = "MEMBER";
    EntryType[EntryType["SESSION"] = 4] = "SESSION";
    EntryType[EntryType["DRUG"] = 5] = "DRUG";
    EntryType[EntryType["ARTICLE"] = 6] = "ARTICLE";
    EntryType[EntryType["USER"] = 7] = "USER";
    EntryType[EntryType["CHAT"] = 8] = "CHAT";
    EntryType[EntryType["ADDRESS"] = 9] = "ADDRESS";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
var QueryStatus;
(function (QueryStatus) {
    QueryStatus[QueryStatus["FAILED"] = 0] = "FAILED";
    QueryStatus[QueryStatus["SUCCESSFULL"] = 1] = "SUCCESSFULL";
})(QueryStatus = exports.QueryStatus || (exports.QueryStatus = {}));
const ADDRESS_TABLE_DEFINITION = {
    tableName: 'addressledger',
    columnNames: ['id', 'al1', 'al2', 'al3', 'pincode'],
};
const MEMBER_TABLE_DEFINITION = {
    tableName: 'MemberLedger',
    columnNames: ['email', 'membership', 'name', 'password', 'phone', 'admin'],
};
const TRANSACTION_TABLE_DEFINITION = {
    tableName: 'TransactionLedger',
    columnNames: [
        'transactionId',
        'buyerName',
        'address',
        'phone',
        'email',
        'productId',
    ],
};
const CHAT_TABLE_DEFINITION = {
    tableName: 'chatledger',
    columnNames: ['moduleid', 'sender', 'chat', 'chatid'],
};
const PRODUCT_TABLE_DEFINITION = {
    tableName: 'ProductLedger',
    columnNames: [
        'productId',
        'name',
        'price',
        'info',
        'numberOfItemsInStock',
        'productThumbnailImgSrc',
        'productCategory',
    ],
};
const MODULE_TABLE_DEFINITION = {
    tableName: 'ModuleLedger',
    columnNames: [
        'id',
        'name',
        'description',
        'price',
        'category',
        'thumbnail',
        'video',
        'articletitle',
        'article',
        'adminEmail',
        'dop',
    ],
};
const USER_TABLE_DEFINITION = {
    tableName: 'UserLedger',
    columnNames: [
        'userid',
        'email',
        'password',
        'username',
        'memtype',
        'phoneno',
    ],
};
const DRUG_TABLE_DEFINITION = {
    tableName: 'DrugLedger',
    columnNames: [
        'id',
        'brandName',
        'brandCode',
        'strnth',
        'qty',
        'packing',
        'sku',
        'manufacturer',
        'marketedby',
        'batchno',
        'hsncode',
        'mfgdate',
        'expdate',
        'mrp',
        'purchaseprice',
        'rate',
        'sgst',
        'cgst',
        'costvar',
        'imgaddress',
        'adminemail',
    ],
};
const SESSION_TABLE_DEFINITION = {
    tableName: 'SessionLedger',
    columnNames: [
        'name',
        'email',
        'phone',
        'category',
        'counsellingDate',
        'sessionId',
    ],
};
const ARTICLE_TABLE_DEFINITION = {
    tableName: 'ArticleLedger',
    columnNames: [
        'id',
        'name',
        'about',
        'admin',
        'publisher',
        'thumbnail',
        'otherimages',
        'dop',
    ],
};
let self;
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor() {
        this.db = pgp({})(jsonData);
        this.self = this;
        this.addUser = async (userObject) => { };
        this.addChat = async (chatObject) => {
            const insertQuerySkeleton = `insert into pharmaschema."${CHAT_TABLE_DEFINITION.tableName}"(${CHAT_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4)`;
            const { moduleid, sender, chat, chatid } = chatObject;
            const values = [moduleid, sender, chat, chatid];
            const returnObject = {
                status: QueryStatus.SUCCESSFULL,
            };
            returnObject.resultObject = await this.db.any(insertQuerySkeleton, values);
            return returnObject;
        };
        this.addDrug = async (drugObject) => {
            const insertQuerySkeleton = `insert into pharmaschema."${DRUG_TABLE_DEFINITION.tableName}"(${DRUG_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)`;
            const { id, batchno, brandCode, brandName, cgst, costvar, expdate, hsncode, manufacturer, marketedby, mfgdate, mrp, packing, purchaseprice, qty, rate, sgst, sku, strnth, imgaddress, adminemail, name, } = drugObject;
            const values = [
                id,
                brandName,
                brandCode,
                strnth,
                qty,
                packing,
                sku,
                manufacturer,
                marketedby,
                batchno,
                hsncode,
                mfgdate,
                expdate,
                mrp,
                purchaseprice,
                rate,
                sgst,
                cgst,
                costvar,
                imgaddress,
                adminemail,
                name,
            ];
            const returnObject = {
                status: QueryStatus.SUCCESSFULL,
            };
            returnObject.resultObject = await this.db.any(insertQuerySkeleton, values);
            return returnObject;
        };
        this.addArticle = async (articleObject) => {
            const insertQuerySkeleton = `insert into pharmaschema."${ARTICLE_TABLE_DEFINITION.tableName}"(${ARTICLE_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5,$6,$7,$8)`;
            const { id, about, admin, name, otherimages, publisher, thumbnail, dop, } = articleObject;
            const values = [
                id,
                name,
                about,
                admin,
                publisher,
                thumbnail,
                otherimages,
                dop,
            ];
            const returnObject = {
                status: QueryStatus.SUCCESSFULL,
            };
            returnObject.resultObject = await this.db.any(insertQuerySkeleton, values);
            return returnObject;
        };
        this.addAddress = async (theAddressObject) => {
            const insertQuerySkeleton = `insert into pharmaschema."${ADDRESS_TABLE_DEFINITION.tableName}"(${ADDRESS_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5)`;
            const { id, al1, al2, al3, pincode } = theAddressObject;
            const values = [id, al1, al2, al3, pincode];
            const query = {
                text: insertQuerySkeleton,
                values: values,
                rowMode: 'array',
            };
            console.log(query);
            const returnObject = {
                status: QueryStatus.SUCCESSFULL,
            };
            returnObject.resultObject = await this.db.any(insertQuerySkeleton, values);
            return returnObject;
        };
        this.addModule = async (theModuleObject) => {
            const insertQuerySkeleton = `insert into pharmaschema."${MODULE_TABLE_DEFINITION.tableName}"(${MODULE_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
            const { id, adminEmail, article, articletitle, category, description, dop, name, price, thumbnail, video, } = theModuleObject;
            const values = [
                id,
                name,
                description,
                price,
                category,
                thumbnail,
                video,
                articletitle,
                article,
                adminEmail,
                dop,
            ];
            const query = {
                text: insertQuerySkeleton,
                values: values,
                rowMode: 'array',
            };
            const returnObject = {
                status: QueryStatus.SUCCESSFULL,
            };
            returnObject.resultObject = this.db.any(insertQuerySkeleton, values);
            return returnObject;
        };
        this.retrieve = async (etype, optionalWhereClause = '') => {
            let tblname;
            switch (etype) {
                case EntryType.DRUG:
                    tblname = DRUG_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.MEMBER:
                    tblname = MEMBER_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.MODULE:
                    tblname = MODULE_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.PRODUCT:
                    tblname = PRODUCT_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.SESSION:
                    tblname = SESSION_TABLE_DEFINITION.tableName;
                case EntryType.TRANSACTION:
                    tblname = TRANSACTION_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.ARTICLE:
                    tblname = ARTICLE_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.USER:
                    tblname = USER_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.CHAT:
                    tblname = CHAT_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.ADDRESS:
                    tblname = ADDRESS_TABLE_DEFINITION.tableName;
                    break;
            }
            const objectToResolve = {
                status: QueryStatus.SUCCESSFULL,
            };
            const theQuery = `select * from pharmaschema."${tblname}" ${optionalWhereClause};`;
            console.log(theQuery);
            objectToResolve.resultObject = await this.db.any(theQuery);
            return objectToResolve;
        };
        this.generateInsertQuerySkeleton = (tableDefinition) => {
            const theQuery = `insert into pharmaschema."${tableDefinition.tableName}"(${tableDefinition.columnNames.toString()}) VALUES ?`;
            return theQuery;
        };
        this.getEntryType = () => {
            return EntryType;
        };
        console.debug(`DatabaseService ${DatabaseService_1.callTimes++}`);
    }
};
DatabaseService.callTimes = 0;
DatabaseService = DatabaseService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map