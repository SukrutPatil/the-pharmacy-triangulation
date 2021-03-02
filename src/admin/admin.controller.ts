import { SessionExecutorService } from './../session-executor/session-executor.service';
import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import e, { Request, Response } from 'express';
import { ModelService } from '../model/model.service';
import { DatabaseService, EntryType } from '../database/database.service';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import * as multer from 'multer';
import * as mime from 'mime';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as fs from 'fs';
import { ModuleService } from '../module/module.service';
let theFileName = '',
  theModuleThumbnail = '',
  theModuleVideo = '';
let theOtherImagesArray: Array<string> = [];
let self: AdminController;

const multerOptions: MulterOptions = {
  storage: multer.diskStorage({
    destination: (_, file, cb) => {
      if (file.fieldname == 'product_thumbnail')
        return cb(null, './uploads/products');
      else if (file.fieldname == 'article_thumbnail')
        return cb(null, './uploads/articles/thumbnail');
      else if (file.fieldname == 'article_otherimages[]')
        return cb(null, './uploads/articles/other');
      else if (file.fieldname == 'moduleThumbnail')
        return cb(null, './uploads/modules/thumbnail');
      else if (file.fieldname == 'moduleVideo')
        return cb(null, './uploads/modules/video');
    },
    filename: (_, file, cb) => {
      const match = ['image/png', 'image/jpeg', 'video/mp4'];
      if (match.indexOf(file.mimetype) === -1) {
        const errorMessage: Error = {
          message: 'Invalid File',
          name: 'INVALID_EXTENSION',
        };
        return cb(errorMessage, null);
      }
      let filename: string;
      if (file.fieldname.startsWith('article'))
        filename = `ART${Date.now()}.${mime.getExtension(file.mimetype)}`;
      else
        filename = `${file.fieldname}-${Date.now()}.${mime.getExtension(
          file.mimetype,
        )}`;
      if (file.fieldname != 'article_otherimages[]') theFileName = filename;
      if (file.fieldname == 'article_otherimages[]')
        theOtherImagesArray.push(theFileName);
      if (file.fieldname == 'moduleThumbnail') theModuleThumbnail = filename;
      if (file.fieldname == 'moduleVideo') theModuleVideo = filename;
      return cb(null, filename);
    },
  }),
};

@Controller('admin')
export class AdminController {
  constructor(
    private readonly se: SessionExecutorService,
    private readonly mg: ModelService,
    private readonly db: DatabaseService,
    private readonly ms: ModuleService,
  ) {}

  // Asking user to login
  @Get('login')
  @Render('AdminLogin.ejs')
  getAdminLogin(): any {
    return { userNotFoundError: 'No' };
  }
  @Post('adminLoginAction')
  async adminLoginAction(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { adminEmail, adminPassword } = req.body;
    const theDatabaseReturnObject = await this.db.retrieve(
      EntryType.MEMBER,
      `where email = '${adminEmail}' and admin = 'yes' and password = '${adminPassword}'`,
    );
    /*** If there is an error while retrieving from database */
    if (theDatabaseReturnObject.error) {
      console.debug(theDatabaseReturnObject.error);
    }
    /*** If there is no admin with these credentials*/
    if (theDatabaseReturnObject.resultObject.length == 0) {
      console.debug(`No Admin Found`);
    } else if (theDatabaseReturnObject.resultObject.length != 1) {
      /*** If there are multiple admins with these credentials i.e. a logical error in database */
      console.debug(`Internal Error: 501`);
    } else {
      /*** Everyting is Good Here */
      req.session.loggedInUser =
        theDatabaseReturnObject.resultObject[0].name;
      req.session.adminEmail = adminEmail;
      res.redirect('products');
    }

    /****
     * Check if the user exists as admin in database
     * Add information to the req.session object
     * req.session.loggedInUser = username
     * If yes, render AllModules.ejs
     * If no, render AdminLogin with {userNotFound:'Yes'}
     ***/
  }
  /**
   * Renders All Products Related To The Admin
   * @param req Express Request
   * @param res Express Response
   */
  @Get('products')
  getProducts(@Req() req: Request, @Res() res: Response): any {
    this.se.adminSessionExecutor(
      req,
      res,
      async () => {
        const { adminEmail } = req.session;
        // Fetching the products from database
        const theDBReturnObject = await this.db.retrieve(
          EntryType.DRUG,
          `where adminemail = '${adminEmail}'`,
        );

        if (theDBReturnObject.error) {
          /** Some error occured while retrieving the drugs */
          console.debug(theDBReturnObject.error);
          res.status(501).redirect('../');
        } else {
          const allRows = theDBReturnObject?.resultObject;
          const arrayOfProductIds = [];
          const arrayOfImageAddresses = [];
          const arrayOfRegularPrices = [];
          const arrayOfSalePrices = [];
          const arrayOfBrandNames = [];

          allRows.forEach(row => {
            arrayOfProductIds.push(row.id);
            arrayOfImageAddresses.push(row.imgaddress);
            arrayOfRegularPrices.push(row.mrp);
            arrayOfSalePrices.push(row.purchaseprice);
            arrayOfBrandNames.push(row.brandname);
          });
          res.render(
            'AllProducts',
            {
              arrayOfProductIds: arrayOfProductIds,
              arrayOfImageAddresses: arrayOfImageAddresses,
              arrayOfRegularPrices: arrayOfRegularPrices,
              arrayOfSalePrices: arrayOfSalePrices,
              arrayOfBrandNames: arrayOfBrandNames,
            },
            (err, html) => {
              if (err) {
                console.debug(err);
                res.status(501).redirect('../');
              }
              res.send(html);
            },
          );
        }
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  @Get('createNewProduct')
  getNewProductPage(@Req() req: Request, @Res() res: Response): any {
    this.se.adminSessionExecutor(
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
  /**
   * Creates New Drug/Product Using SessionExecutorService, ModelService and DatabaseService
   * @param req Express Request Object
   * @param res Express Response Object
   * Uses Multer Middleware to read multipart/form-data encryption type.
   * */
  @Post('newProduct')
  @UseInterceptors(FilesInterceptor('product_thumbnail', 1, multerOptions))
  async createNewProduct(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const {
      name,
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
      name,
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
      theFileName,
      req.session.adminEmail,
    );
    console.log('To Database Service');
    const returnedObject = await this.db.addDrug(theDrugObject);
    if (returnedObject.error) console.log(returnedObject.error);
    res.redirect('products');
  }

  @Get('articles')
  getAllArticles(@Req() req: Request, @Res() res: Response): any {
    this.se.adminSessionExecutor(
      req,
      res,
      async () => {
        const theDBReturnObject = await this.db.retrieve(
          EntryType.ARTICLE,
          `where admin = '${req.session.adminEmail}'`,
        );
        if (theDBReturnObject.error) {
          // Some Database Error Has Occured
          console.debug('Internal Error Here');
          res.status(501).redirect('../');
        } else {
          const artThumbnailArray = [];
          const artNameArray = [];
          const artPublisherArray = [];
          const artDopArray = [];
          theDBReturnObject.resultObject.forEach(row => {
            artThumbnailArray.push(row.thumbnail);
            artNameArray.push(row.name);
            artPublisherArray.push(row.publisher);
            artDopArray.push(row.dop);
          });
          res.render('AllArticles', {
            artThumbnailArray: artThumbnailArray,
            artNameArray: artNameArray,
            artPublisherArray: artPublisherArray,
            artDopArray: artDopArray,
          });
        }
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  // Creating a new article
  @Get('createNewArticle')
  getNewArticlePage(@Req() req: Request, @Res() res: Response): any {
    this.se.adminSessionExecutor(
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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'article_thumbnail', maxCount: 1 },
        { name: 'article_otherimages[]', maxCount: 3 },
      ],
      multerOptions,
    ),
  )
  createNewArticle(@Req() req: Request, @Res() res: Response): any {
    this.se.adminSessionExecutor(
      req,
      res,
      async () => {
        const {
          article_name,
          article_publisher_name,
          article_about,
          article_article,
        } = req.body;
        const theArticleObject = this.mg.createArticleObject(
          article_name,
          article_publisher_name,
          article_about,
          req.session.adminEmail,
          theFileName,
          theOtherImagesArray.toString(),
        );
        const theDatabaseReturnObject = await this.db.addArticle(
          theArticleObject,
        );
        if (theDatabaseReturnObject.error) {
          // Some Error Occured Internally
          console.debug(theDatabaseReturnObject.error);
          res.status(501).redirect('../');
        } else {
          fs.writeFile(
            `Articles/${theArticleObject.id}.md`,
            article_article,
            err => {
              if (err)
                console.debug(`Error Occured While Writing File: ${err}`);
              else
                console.debug(`The File Has Been Written. with details
                      ${article_article}`);
              res.redirect('./articles');
            },
          );
        }
      },
      () => {
        res.redirect('login');
      },
    );
    theOtherImagesArray = [];
  }

  @Get('modules')
  async getAllModule(@Req() req: Request, @Res() res: Response): Promise<any> {
    const allModules = await this.ms.getAllModules();
    
    this.se.adminSessionExecutor(
      req,
      res,
      () => {
        if (!allModules) {
          res.render('404', {});
          return;
        }
        res.render('AllModules', {allModules});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  // Creating a new module
  @Get('createNewModule')
  getNewModulePage(@Req() req: Request, @Res() res: Response): any {
    this.se.adminSessionExecutor(
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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'moduleThumbnail', maxCount: 1 },
        { name: 'moduleVideo', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  createNewModule(@Req() req: Request, @Res() res: Response): any {
    this.se.adminSessionExecutor(
      req,
      res,
      async () => {
        const {
          module_name,
          module_desc,
          module_price,
          module_type,
          module_article_title,
          module_article,
        } = req.body;
        const theModuleObject = this.mg.createModuleObject(
          module_name,
          module_desc,
          module_price,
          module_type,
          theModuleThumbnail,
          theModuleVideo,
          module_article_title,
          module_article,
          req.session.adminEmail,
        );
        const theDBReturnObject = await this.db.addModule(theModuleObject);
        if (theDBReturnObject.error) console.log(theDBReturnObject.error);

        res.redirect('modules');
      },
      () => {
        res.status(501).redirect('../');
      },
    );
  }

  @Get('sessions')
  getAllSessions(@Req() req: Request, @Res() res: Response): any {
    this.se.adminSessionExecutor(
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
    this.se.adminSessionExecutor(
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
    this.se.adminSessionExecutor(
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
    this.se.adminSessionExecutor(
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
     * easily distinguis</a>h.</a>
     */
  }
}
