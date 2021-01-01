import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseService, EntryType } from './database/database.service';
@Controller()
export class AppController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  @Render('Homepage.ejs')
  async getHomePage(@Req() req: Request, @Res() res: Response): Promise<any> {
    //Fetch products Data
    const theDBReturnObject = await this.db.retrieve(EntryType.DRUG);
    const prod_id: Array<string> =[];
    const prod_name: Array<string> = [];
    const prod_price: Array<string> = [];
    const prod_img: Array<string> = [];
    if (theDBReturnObject.error) {
      console.debug(`Error Here`);
      res.status(501);
    }
    theDBReturnObject.resultObject.rows.forEach(productEntry => {
      const { id, name, mrp, imgaddress } = productEntry;
      prod_id.push(id);
      prod_name.push(name);
      prod_price.push(mrp);
      prod_img.push(imgaddress);
    });
    return {
      loggedInUser: req.session.loggedInUser,
      prod_id,
      prod_name: prod_name,
      prod_price: prod_price,
      prod_img: prod_img,
    };
  }

  @Get('aboutUs')
  @Render('AboutUs.ejs')
  getAboutUSPage(): any {
    return {};
  }
}
