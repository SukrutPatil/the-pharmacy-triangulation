import { SessionExecutorService } from './../session-executor/session-executor.service';
import {
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ModelService } from '../model/model.service';
import { DatabaseService } from '../database/database.service';

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
    // this.se.sessionExecutor(
    //   req,
    //   res,
    //   () => {
    res.render('NewProduct', {});
    //   },
    //   () => {
    //     res.status(301).redirect('login');
    //   },
    // );
  }

  @Post('newProduct')
  createNewProduct(@Req() req: Request, @Res() res: Response): any {
    const {
      product_name,
      product_price,
      product_discounted_amount,
      product_manufactured_by,
      product_batch_number,
      product_hsn_code,
      product_expiry_date,
      product_total_in_stock,
    } = req.body;
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
  deleteItem(@Req() req: Request, @Res() res: Response): any {}
  /**
   * Based on id the item to be deleted can be
   * easily distingus.
   */
}
