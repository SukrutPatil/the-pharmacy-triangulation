import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { DatabaseService, EntryType } from './database/database.service';
import { ProductsService } from './products/products.service';
@Controller()
export class AppController {
  constructor(
    private readonly db: DatabaseService,
    private readonly ps: ProductsService,
    private readonly as: AppService
  ) {}

  @Get()
  @Render('Homepage.ejs')
  async getHomePage(@Req() req: Request, @Res() res: Response): Promise<any> {
    let allModules = await this.as.getRandomArrayOfModules();
    //Fetch products Data
    const theDBReturnObject = await this.db.retrieve(EntryType.DRUG);
    const prod_id: Array<string> = [];
    const prod_name: Array<string> = [];
    const prod_price: Array<string> = [];
    const prod_img: Array<string> = [];
    if (theDBReturnObject.error) {
      console.debug(`Error Here`);
      res.status(501);
    }
    theDBReturnObject.resultObject.rows.forEach(productEntry => {
      const { id, brandname, mrp, imgaddress } = productEntry;
      prod_id.push(id);
      prod_name.push(brandname);
      prod_price.push(mrp);
      prod_img.push(imgaddress);
    });
    return {
      loggedInUser: req.session.loggedInUser,
      prod_id,
      prod_name: prod_name,
      prod_price: prod_price,
      prod_img: prod_img,
      allModules
    };
  }
  @Get('listOfAllProducts')
  async getListOfAllProductsPage(@Res() res:Response) {
    const allProducts = await this.ps.getAllProducts();
    if (!allProducts) res.render('404', {errorMessage:'No Products found in database. '});
    res.render('ListOfAllProducts', { allProducts });
  }
  @Get('aboutUs')
  @Render('AboutUs.ejs')
  getAboutUSPage(): any {
    return {};
  }
  
  
}
