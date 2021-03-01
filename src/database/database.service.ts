import { Injectable } from '@nestjs/common';
import { Pool, PoolConfig, QueryResult } from 'pg';
import * as pgp from 'pg-promise';

import {
  Address,
  Article,
  Chat,
  Drug,
  Module,
  User,
} from '../model/model.service';
import * as jsonData from '../../DatabaseInfo.json';
import { json } from 'express';

export enum EntryType {
  PRODUCT,
  MODULE,
  TRANSACTION,
  MEMBER,
  SESSION,
  DRUG,
  ARTICLE,
  USER,
  CHAT,
  ADDRESS,
}
export enum QueryStatus {
  FAILED,
  SUCCESSFULL,
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
const ADDRESS_TABLE_DEFINITION: TableDefinitionInterface = {
  tableName: 'addressledger',
  columnNames: ['id', 'al1', 'al2', 'al3', 'pincode'],
};
const MEMBER_TABLE_DEFINITION: TableDefinitionInterface = {
  tableName: 'MemberLedger',
  columnNames: ['email', 'membership', 'name', 'password', 'phone', 'admin'],
};
const TRANSACTION_TABLE_DEFINITION: TableDefinitionInterface = {
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
const CHAT_TABLE_DEFINITION: TableDefinitionInterface = {
  tableName: 'chatledger',
  columnNames: ['moduleid', 'sender', 'chat', 'chatid'],
};
const PRODUCT_TABLE_DEFINITION: TableDefinitionInterface = {
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
const MODULE_TABLE_DEFINITION: TableDefinitionInterface = {
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
const USER_TABLE_DEFINITION: TableDefinitionInterface = {
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
const DRUG_TABLE_DEFINITION: TableDefinitionInterface = {
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
const SESSION_TABLE_DEFINITION: TableDefinitionInterface = {
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
const ARTICLE_TABLE_DEFINITION: TableDefinitionInterface = {
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

/**
 *The Database Core Connector
 *
 * Note: This class only returns the result object. The classes using this object must implement further actions on it.
 * This implementation must be implemented in controllers.
 * Check out DBReturnInterface above
 * @export
 * @class DatabaseService
 */
let self: any;

@Injectable()
export class DatabaseService {
  static callTimes = 0;
  constructor() {
    console.debug(`DatabaseService ${DatabaseService.callTimes++}`);
  }
  db = pgp({})(jsonData);
  self = this;
    
  public addUser = async (userObject: User): Promise<any> => {};
  public addChat = async (chatObject: Chat): Promise<DBReturnInterface> => {
    const insertQuerySkeleton = `insert into pharmaschema."${
      CHAT_TABLE_DEFINITION.tableName
    }"(${CHAT_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4)`;
    const { moduleid, sender, chat, chatid } = chatObject;
    const values = [moduleid, sender, chat, chatid];
      const returnObject: DBReturnInterface = {
        status: QueryStatus.SUCCESSFULL,
      };
     returnObject.resultObject = await this.db.any(insertQuerySkeleton,values);
      return returnObject;
  };
  public addDrug = async (drugObject: Drug): Promise<any> => {
    const insertQuerySkeleton = `insert into pharmaschema."${
      DRUG_TABLE_DEFINITION.tableName
    }"(${DRUG_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)`;
    const {
      id,
      batchno,
      brandCode,
      brandName,
      cgst,
      costvar,
      expdate,
      hsncode,
      manufacturer,
      marketedby,
      mfgdate,
      mrp,
      packing,
      purchaseprice,
      qty,
      rate,
      sgst,
      sku,
      strnth,
      imgaddress,
      adminemail,
      name,
    } = drugObject;
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


      const returnObject: DBReturnInterface = {
        status: QueryStatus.SUCCESSFULL,
      };
      returnObject.resultObject=await this.db.any(insertQuerySkeleton,values);
      return returnObject;
  };
  public addArticle = async (
    articleObject: Article,
  ): Promise<DBReturnInterface> => {
    const insertQuerySkeleton = `insert into pharmaschema."${
      ARTICLE_TABLE_DEFINITION.tableName
    }"(${ARTICLE_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5,$6,$7,$8)`;
    const {
      id,
      about,
      admin,
      name,
      otherimages,
      publisher,
      thumbnail,
      dop,
    } = articleObject;
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
          const returnObject: DBReturnInterface = {
        status: QueryStatus.SUCCESSFULL,
      };
    

    returnObject.resultObject = await this.db.any(insertQuerySkeleton,values);
    return returnObject;
  };
  public addAddress = async (
    theAddressObject: Address,
  ): Promise<DBReturnInterface> => {
    const insertQuerySkeleton = `insert into pharmaschema."${
      ADDRESS_TABLE_DEFINITION.tableName
    }"(${ADDRESS_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5)`;
    const { id, al1, al2, al3, pincode } = theAddressObject;
    const values = [id, al1, al2, al3, pincode];
    const query = {
      text: insertQuerySkeleton,
      values: values,
      rowMode: 'array',
    };
    console.log(query);
   
      const returnObject: DBReturnInterface = {
        status: QueryStatus.SUCCESSFULL,
      };
   returnObject.resultObject = await this.db.any(insertQuerySkeleton,values);
   return returnObject;   
  };
  public addModule = async (
    theModuleObject: Module,
  ): Promise<DBReturnInterface> => {
    const insertQuerySkeleton = `insert into pharmaschema."${
      MODULE_TABLE_DEFINITION.tableName
    }"(${MODULE_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
    const {
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
    } = theModuleObject;
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


      const returnObject: DBReturnInterface = {
        status: QueryStatus.SUCCESSFULL,
      };
      returnObject.resultObject=this.db.any(insertQuerySkeleton,values);
      return returnObject;
  };
  /*** UPDATE QUERIES */

  /*** DELETE QUERIES */

  /*** SELECT QUERIES */
  public retrieve = async (
    etype: EntryType,
    optionalWhereClause = '',
  ): Promise<DBReturnInterface> => {
    let tblname: string;
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
     
      const objectToResolve: DBReturnInterface = {
        status: QueryStatus.SUCCESSFULL,
      };
      const theQuery = `select * from pharmaschema."${tblname}" ${optionalWhereClause};`;
      console.log(theQuery);
      objectToResolve.resultObject=await this.db.any(theQuery);
      return objectToResolve;
      
  };
  /*** Skeletons */
  public generateInsertQuerySkeleton = (
    tableDefinition: TableDefinitionInterface,
  ): string => {
    const theQuery = `insert into pharmaschema."${
      tableDefinition.tableName
    }"(${tableDefinition.columnNames.toString()}) VALUES ?`;
    return theQuery;
  };

  getEntryType = (): any => {
    return EntryType;
  };
}
