import { ModuleType } from './../model/model.service';
import { Injectable } from '@nestjs/common';
import { Pool,QueryResult } from 'pg';
enum EntryType {
  PRODUCT,
  VIDEO,
  TRANSACTION,
  MEMBER,
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
  status: QueryStatus,
  resultObject?: QueryResult<any>,
  error?:any
}
const MEMBER_TABLE_DEFINITION: TableDefinitionInterface = {
  tableName: 'MemberLedger',
  columnNames: [
    'MemberName',
    'MemberEmail',
    'MemberPhone',
    'MemberPassword',
    'MembershipType',
    'IsAdmin',
  ],
};
const TRANSACTION_TABLE_DEFINITION: TableDefinitionInterface = {
  tableName: 'TransactionLedger',
  columnNames: [
    'TransactionId',
    'BuyerName',
    'BuyerAddress',
    'BuyerPhone',
    'BuyerEmail',
    'ProductId',
  ],
};
const PRODUCT_TABLE_DEFINITION: TableDefinitionInterface = {
  tableName: 'ProductLedger',
  columnNames: [
    'ProductId',
    'Product_Main_Image_Src',
    'ProductName',
    'ProductPrice',
    'ProductInfo',
    'ItemsInStock',
  ],
};
const VIDEO_TABLE_DEFINITION: TableDefinitionInterface = {
  tableName: 'VideoLedger',
  columnNames: [
    'VideoId',
    'VideoTitle',
    'VideoSrc',
    'VideoInfo',
    'VideoModule',
    'VideoJSONSrc',
  ],
};
@Injectable()
export class DatabaseService {
  pool = new Pool({
    user: 'postgres',
    host: 'database.server.com',
    database: 'pharmadb',
    password: 'toor',
  });
  /*** INSERT QUERY */
  public add = async<T>(etype: EntryType, obj: T): Promise<DBReturnInterface> => {
    let insertQuery: string;
    const values:Array<any> = Object.keys(obj).map(key=>obj[key])
    
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
      case EntryType.VIDEO:
        insertQuery = this.generateInsertQuerySkeleton(VIDEO_TABLE_DEFINITION);
        break;
    }
    return new Promise((resolve)=>{
      let objectToResolve:DBReturnInterface;
      objectToResolve.status = QueryStatus.SUCCESSFULL
        this.pool.query(insertQuery,values,(err,result)=>{
          if (err) {
            objectToResolve.error = err;
            objectToResolve.status = QueryStatus.FAILED
          }
          else objectToResolve.resultObject = result
          resolve(objectToResolve)
        })
    })
    
  };

  /*** UPDATE QUERIES */

  /*** DELETE QUERIES */

  /*** SELECT QUERIES */

  private generateInsertQuerySkeleton = (
    tableDefinition: TableDefinitionInterface,
  ): string => {
    const theQuery = `insert into ${
      tableDefinition.tableName
    }(${tableDefinition.columnNames.toString()}) VALUES ?`;
    return theQuery;
  };
}
