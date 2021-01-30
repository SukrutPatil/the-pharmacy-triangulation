import { Injectable } from '@nestjs/common';
import { Pool, PoolConfig, QueryResult } from 'pg';
import { Article, Drug, Module, User } from '../model/model.service';
import * as jsonData from '../../DatabaseInfo.json';

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
}
export enum QueryStatus {
  FAILED,
  SUCCESSFULL,
}
interface TableDefinitionInterface {
  tableName: string;
  columnNames: Array<string>;
}
interface DBReturnInterface {
  status: QueryStatus;
  resultObject?: QueryResult<any>;
  error?: any;
}
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
  constructor() {
    console.log('Database Service Initialized');
  }

  pool = new Pool(jsonData);
  self = this;
  /*** INSERT QUERY */
  /**
   *Generically accepts objects defined in Model Service Class
   *
   * @memberof DatabaseService
   */
  // public add = async <T>(
  //   etype: EntryType,
  //   obj: T,
  // ): Promise<DBReturnInterface> => {
  //   let insertQuery: string;
  //   const values: Array<any> = Object.keys(obj).map(key => obj[key]);

  //   switch (etype) {
  //     case EntryType.MEMBER:
  //       insertQuery = this.generateInsertQuerySkeleton(MEMBER_TABLE_DEFINITION);
  //       break;
  //     case EntryType.PRODUCT:
  //       insertQuery = this.generateInsertQuerySkeleton(
  //         PRODUCT_TABLE_DEFINITION,
  //       );
  //       break;
  //     case EntryType.TRANSACTION:
  //       insertQuery = this.generateInsertQuerySkeleton(
  //         TRANSACTION_TABLE_DEFINITION,
  //       );
  //       break;
  //     case EntryType.MODULE:
  //       insertQuery = this.generateInsertQuerySkeleton(MODULE_TABLE_DEFINITION);
  //       break;
  //     case EntryType.SESSION:
  //       insertQuery = this.generateInsertQuerySkeleton(
  //         SESSION_TABLE_DEFINITION,
  //       );
  //       break;
  //     case EntryType.DRUG:
  //       insertQuery = this.generateInsertQuerySkeleton(DRUG_TABLE_DEFINITION);
  //       break;
  //   }

  //   return new Promise(resolve => {
  //     const objectToResolve:DBReturnInterface = {status:QueryStatus.SUCCESSFULL};

  //     console.log("Entering Query Callback: "+insertQuery)
  //     console.log(values)
  //     this.pool.query(insertQuery, values, (err, result) => {
  //       if (err) {
  //         objectToResolve.error = err;
  //         objectToResolve.status = QueryStatus.FAILED;
  //       } else objectToResolve.resultObject = result;
  //       resolve(objectToResolve);
  //     });
  //   });
  // };
  public addUser = async (userObject: User): Promise<any> => { };
  public addChat = async (chatObject):Promise<any> =>{ };
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
    const query = {
      text: insertQuerySkeleton,
      values: values,
      rowMode: 'array',
    };
    return new Promise(resolve => {
      const returnObject: DBReturnInterface = {
        status: QueryStatus.SUCCESSFULL,
      };
      this.pool.connect(err => {
        if (err) console.log(err);
      });
      this.pool.query(query, (err: Error, result) => {
        if (err) {
          returnObject.error = err;
          returnObject.status = QueryStatus.FAILED;
        } else {
          returnObject.resultObject = result;
        }
        resolve(returnObject);
      });
    });
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

    const query = {
      text: insertQuerySkeleton,
      values: values,
      rowMode: 'array',
    };
    return new Promise(resolve => {
      const returnObject: DBReturnInterface = {
        status: QueryStatus.SUCCESSFULL,
      };
      this.pool.connect(err => {
        if (err) console.log(err);
      });
      this.pool.query(query, (err: Error, result) => {
        if (err) {
          returnObject.error = err;
          returnObject.status = QueryStatus.FAILED;
        } else {
          returnObject.resultObject = result;
        }
        resolve(returnObject);
      });
    });
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
    console.log(query);
    return new Promise(resolve => {
      const returnObject: DBReturnInterface = {
        status: QueryStatus.SUCCESSFULL,
      };
      this.pool.connect(err => {
        if (err) console.log(err);
      });
      this.pool.query(query, (err: Error, result) => {
        if (err) {
          returnObject.error = err;
          returnObject.status = QueryStatus.FAILED;
        } else {
          returnObject.resultObject = result;
        }
        resolve(returnObject);
      });
    });
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
    }
    return new Promise(resolve => {
      const objectToResolve: DBReturnInterface = {
        status: QueryStatus.SUCCESSFULL,
      };
      const theQuery = `select * from pharmaschema."${tblname}" ${optionalWhereClause};`;
      console.log(theQuery);
      this.pool.connect(err => {
        if (err) console.log(err);
      });
      this.pool.query(theQuery, (err, result) => {
        if (err) {
          console.log('Query Callback Error');
          objectToResolve.error = err;
          objectToResolve.status = QueryStatus.FAILED;
        } else {
          console.log('Query Callback no Error');
          objectToResolve.resultObject = result;
        }
        resolve(objectToResolve);
      });
    });
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
