import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { SessionExecutorService } from 'src/session-executor/session-executor.service';
import { Request, Response } from 'express';

@Controller('user')
// '' Will work for home page if User hasn't login yet
// if user logined, then it user/... routing will work
export class UserController {
  constructor(private readonly se: SessionExecutorService) {}

  @Get('login')
  @Render('Login.ejs')
  getUserLogin(): any {
    return { userNotFoundError: 'No' };
  }

  @Post('userLoginAction')
  adminLoginAction(@Req() req: Request, @Res() res: Response): any {
    const { userEmail, userPassword } = req.body;
    throw 'expects further implementation';
    /****
     * Check if the user exists as admin in database
     * Add information to the req.session object
     * req.session.loggedInUser = username
     * If yes, render AllModules.ejs
     * If no, render AdminLogin with {userNotFound:'Yes'}
     *  */
  }

  @Get('membership')
  getMemebership(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('MembershipBuying', {});
      },
      () => {
        res.status(301).redirect('login');
      },
    );
  }

  @Post('membershipBuying')
  buyMembership(@Req() req: Request, @Res() res: Response): any {
    const { name, email, phNo, password, ctype } = req.body;
    throw 'expects further implementation';
  }

  @Get('MedicationCounseling')
  getMedicationCounseling(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('Medication', {});
      },
      () => {
        res.status(301).redirect('../auth/login');
      },
    );
  }

  @Post('Medication')
  getMedicationSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
  }

  @Get('EntrepreneurshipCounseling')
  getEntrepreneurshipCounseling(
    @Req() req: Request,
    @Res() res: Response,
  ): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('Entrepreneurship', {});
      },
      () => {
        res.status(301).redirect('../auth/login');
      },
    );
  }

  @Post('Entrepreneurship')
  getEntrepreneurshipSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
  }

  @Get('CareerCounseling')
  getCareerCounseling(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('Career', {});
      },
      () => {
        res.status(301).redirect('../auth/login');
      },
    );
  }

  @Post('Career')
  getCareerSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
  }

  @Get('DietCounseling')
  getDietCounseling(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('Diet', {});
      },
      () => {
        res.status(301).redirect('../auth/login');
      },
    );
  }

  @Get('Products')
  getProducts(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('ProductSelling', {});
      },
      () => {
        res.status(301).redirect('../auth/login');
      },
    );
  }
}
