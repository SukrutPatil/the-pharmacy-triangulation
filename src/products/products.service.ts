import { Injectable } from '@nestjs/common';
import { DatabaseService, EntryType } from '../database/database.service';

@Injectable()
export class ProductsService {
  static callTimes = 0;
  constructor(private readonly dbService: DatabaseService) {
    console.debug(`ProductsService ${ProductsService.callTimes++}`);
  }
  async getAllProducts() {
    const dbReturnObject = await this.dbService.retrieve(EntryType.DRUG);
      if (dbReturnObject.error) {
      
          return null;
      }
      const allRows = dbReturnObject.resultObject.rows;
      
      return allRows;
  }
  async getParticularProduct(id: string) {
    const allProducts = await this.getAllProducts();
    if (!allProducts) {
      // No products found
      return null;
    }
    const theProduct = allProducts.find((product) => {
      return product.id === id;
    });
    return theProduct?theProduct:null;
  }
}
