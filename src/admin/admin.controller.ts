import { SessionExecutorService } from './../session-executor/session-executor.service';
import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly se: SessionExecutorService) {}
  @Get('login')
  @Render('AdminLogin.ejs')
  getAdminLogin(): any {
    return {userNotFoundError:"No"};
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
}
