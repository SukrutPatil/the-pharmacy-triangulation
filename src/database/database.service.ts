import { ModuleType } from './../model/model.service';
import { Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { async } from 'rxjs';
enum EntryType {
  PRODUCT,
  MODULE,
  TRANSACTION,
  MEMBER,
  SESSION,
  DRUG,
}
enum QueryStatus {
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
  tableName: 'VideoLedger',
  columnNames: [
    'moduleId',
    'moduleDesc',
    'moduleCategory',
    'modulePrice',
    'moduleArticleTitle',
    'moduleArticleBody',
    'moduleThumbnailSrc',
    'moduleVideoSrc',
  ],
};
const DRUG_TABLE_DEFINITION: TableDefinitionInterface = {
  tableName: 'DrugLedger',
  columnNames: [
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
  ],};
/**
 *The Database Core Connector
 *
 * Note: This class only returns the result object. The classes using this object must implement further actions on it. 
 * This implementation must be implemented in controllers.
 * Check out DBReturnInterface above
 * @export
 * @class DatabaseService
 */
@Injectable()
export class DatabaseService {
  pool = new Pool({
    user: 'postgres',
    host: 'database.server.com',
    database: 'pharmadb',
    password: 'toor',
  });
  /*** INSERT QUERY */
  /**
   *Generically accepts objects defined in Model Service Class
   *
   * @memberof DatabaseService
   */
  public add = async <T>(
    etype: EntryType,
    obj: T,
  ): Promise<DBReturnInterface> => {
    let insertQuery: string;
    const values: Array<any> = Object.keys(obj).map(key => obj[key]);

    switch (etype) {
      case EntryType.MEMBER:
        insertQuery = this.generateInsertQuerySkeleton(MEMBER_TABLE_DEFINITION);
        break;
      case EntryType.PRODUCT:
        insertQuery = this.generateInsertQuerySkeleton(
          PRODUCT_TABLE_DEFINITION,
        );
        break;
      case EntryType.TRANSACTION:
        insertQuery = this.generateInsertQuerySkeleton(
          TRANSACTION_TABLE_DEFINITION,
        );
        break;
      case EntryType.MODULE:
        insertQuery = this.generateInsertQuerySkeleton(MODULE_TABLE_DEFINITION);
        break;
      case EntryType.SESSION:
        insertQuery = this.generateInsertQuerySkeleton(
          SESSION_TABLE_DEFINITION,
        );
        break;
      case EntryType.DRUG:
        insertQuery = this.generateInsertQuerySkeleton(DRUG_TABLE_DEFINITION);
        break;
    }
    return new Promise(resolve => {
      let objectToResolve: DBReturnInterface;
      objectToResolve.status = QueryStatus.SUCCESSFULL;
      this.pool.query(insertQuery, values, (err, result) => {
        if (err) {
          objectToResolve.error = err;
          objectToResolve.status = QueryStatus.FAILED;
        } else objectToResolve.resultObject = result;
        resolve(objectToResolve);
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
    }
    return new Promise(resolve => {
      let objectToResolve: DBReturnInterface;
      objectToResolve.status = QueryStatus.SUCCESSFULL;
      this.pool.query(`select * from ${tblname} ${optionalWhereClause}`,(err,result)=>{
        if (err) {
          objectToResolve.error = err;
          objectToResolve.status = QueryStatus.FAILED;
        } else objectToResolve.resultObject = result;
        resolve(objectToResolve);
      });
    });
  };
  /*** Skeletons */
  private generateInsertQuerySkeleton = (
    tableDefinition: TableDefinitionInterface,
  ): string => {
    const theQuery = `insert into ${
      tableDefinition.tableName
    }(${tableDefinition.columnNames.toString()}) VALUES ?`;
    return theQuery;
  };
}
