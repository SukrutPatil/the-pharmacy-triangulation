import { SessionExecutorService } from './../session-executor/session-executor.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ModelService } from '../model/model.service';
import { DatabaseService, EntryType } from '../database/database.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as mime from 'mime';
@Controller('admin')
export class AdminController {
  constructor(
    private readonly se: SessionExecutorService,
    private readonly mg: ModelService,
    private readonly db: DatabaseService,
  ) {}

  // Asking user to login
  @Get('login')
  @Render('AdminLogin.ejs')
  getAdminLogin(): any {
    return { userNotFoundError: 'No' };
  }
  @Post('adminLoginAction')
  adminLoginAction(@Req() req: Request, @Res() res: Response): any {
    const { adminEmail, adminPassword } = req.body;
    throw 'expects further implementation';
    /****
     * Check if the user exists as admin in database
     * Add information to the req.session object
     * req.session.loggedInUser = username
     * If yes, render AllModules.ejs
     * If no, render AdminLogin with {userNotFound:'Yes'}
     *  */
  }

  @Get('products')
  getProducts(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        const pID = req.params.id;
        res.render('AllProducts', {});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  // Creating a new Product
  @Get('createNewProduct')
  getNewProductPage(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
    res.render('NewProduct', {});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  @Post('newProduct')
  @UseInterceptors(
    FilesInterceptor('product_thumbnail', 1, {
      storage: multer.diskStorage({
        destination: './uploads/products',
        filename: (_, file, cb) => {
          const match = ['image/png', 'image/jpeg'];
          if (match.indexOf(file.mimetype) === -1) {
            const errorMessage: Error = {
              message: 'Invalid File',
              name: 'INVALID_EXTENSION',
            };
            return cb(errorMessage, null);
          }
          const filename = `${file.fieldname}-${Date.now()}.${mime.getExtension(
            file.mimetype
          )}`;
          return cb(null, filename);
        },
      }),
    }),
  )
  async createNewProduct(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const {
      brand_name,
      brand_code,
      strength,
      qty,
      packing,
      manufacturer,
      marketedby,
      batch_number,
      hsn_code,
      mfg_date,
      exp_date,
      product_mrp,
      product_purchase_price,
      product_rate,
      product_sgst,
      product_cgst,
      product_cost_var,
      product_sku,
    } = req.body;
    console.log(req.body);
    const theDrugObject = this.mg.createDrugObject(
      brand_name,
      brand_code,
      strength,
      qty,
      packing,
      manufacturer,
      marketedby,
      batch_number,
      hsn_code,
      mfg_date,
      exp_date,
      product_mrp,
      product_purchase_price,
      product_rate,
      product_sgst,
      product_cgst,
      product_cost_var,
      product_sku,
    );
    console.log('To Database Service');
    const returnedObject = await this.db.addDrug(theDrugObject);
    if (returnedObject.error) console.log(returnedObject.error);
    res.redirect('products')
  }

  @Get('articles')
  getAllArticles(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('Articles', {});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  // Creating a new article
  @Get('createNewArticle')
  getNewArticlePage(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('NewArticle', {});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  @Post('newArticle')
  createNewArticle(@Req() req: Request, @Res() res: Response): any {
    throw 'expects further implementation';
  }

  @Get('modules')
  getAllModule(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('AllModules', {});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  // Creating a new module
  @Get('createNewModule')
  getNewModulePage(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('NewModule', {});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  @Post('newModule')
  createNewModule(@Req() req: Request, @Res() res: Response): any {
    throw 'expects further implementation';
  }

  @Get('sessions')
  getAllSessions(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('AllSessions', {});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  // Update a new Product
  @Get('updateProduct/:id')
  getUpdateProductPage(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        const pID = req.params.id;
        res.render(`UpdateProduct/: ${pID}`, {});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  @Post('updateProduct')
  updateNewProduct(@Req() req: Request, @Res() res: Response): any {
    throw 'expects further implementation';
  }

  // Update a article
  @Get('updateArticle/:id')
  getUpdateArticlePage(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        const aID = req.params.id;
        res.render(`UpdateArticle/: ${aID}`, {});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  @Post('updateArticle')
  updateNewArticle(@Req() req: Request, @Res() res: Response): any {
    throw 'expects further implementation';
  }

  // Update a module
  @Get('updateModule/:id')
  getUpdateModulePage(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        const mID = req.params.id;
        res.render(`UpdateModule/: ${mID}`, {});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  @Post('updateModule')
  updateNewModule(@Req() req: Request, @Res() res: Response): any {
    throw 'expects further implementation';
  }

  /***
   * Delete the items
   */

  @Get('delete/:id')
  deleteItem(@Req() req: Request, @Res() res: Response): any {
  /**
   * Based on id the item to be deleted can be
   * easily distingus.
   */
  }
}
