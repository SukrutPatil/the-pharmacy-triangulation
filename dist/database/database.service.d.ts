import * as pgp from 'pg-promise';
import Address from 'src/model/address.entity';
import Article from 'src/model/article.entity';
import Chat from 'src/model/chat.entity';
import Drug from 'src/model/drug.entity';
import Module from 'src/model/module.entity';
import User from 'src/model/user.entity';
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
    resultObject?: any;
    error?: any;
}
export declare class DatabaseService {
    static callTimes: number;
    constructor();
    db: pgp.IDatabase<{}, import("pg-promise/typescript/pg-subset").IClient>;
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
