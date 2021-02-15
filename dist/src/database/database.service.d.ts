import { Pool, QueryResult } from 'pg';
import { Address, Article, Chat, Drug, Module, User } from '../model/model.service';
export declare enum EntryType {
    PRODUCT = 0,
    MODULE = 1,
    TRANSACTION = 2,
    MEMBER = 3,
    SESSION = 4,
    DRUG = 5,
    ARTICLE = 6,
    USER = 7,
    CHAT = 8,
    ADDRESS = 9
}
export declare enum QueryStatus {
    FAILED = 0,
    SUCCESSFULL = 1
}
interface TableDefinitionInterface {
    tableName: string;
    columnNames: string[];
}
interface DBReturnInterface {
    status: QueryStatus;
    resultObject?: QueryResult<any>;
    error?: any;
}
export declare class DatabaseService {
    constructor();
    pool: Pool;
    self: this;
    addUser: (userObject: User) => Promise<any>;
    addChat: (chatObject: Chat) => Promise<DBReturnInterface>;
    addDrug: (drugObject: Drug) => Promise<any>;
    addArticle: (articleObject: Article) => Promise<DBReturnInterface>;
    addAddress: (theAddressObject: Address) => Promise<DBReturnInterface>;
    addModule: (theModuleObject: Module) => Promise<DBReturnInterface>;
    retrieve: (etype: EntryType, optionalWhereClause?: string) => Promise<DBReturnInterface>;
    generateInsertQuerySkeleton: (tableDefinition: TableDefinitionInterface) => string;
    getEntryType: () => any;
}
export {};
