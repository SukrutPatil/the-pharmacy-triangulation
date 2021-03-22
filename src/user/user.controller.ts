import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { SessionExecutorService } from '../session-executor/session-executor.service';
import { Request, Response } from 'express';
import { ModuleCategory, ModuleService } from '../module/module.service';

@Controller('user')
// '' Will work for home page if User hasn't login yet
// if user logined, then it user/... routing will work
export class UserController {
  constructor(
    private readonly se: SessionExecutorService,
    private readonly ms: ModuleService,
  ) {}

  @Get(['', 'AllModules'])
  getAllModules(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('AllModules', {}, (err: Error, html: String) => {
          if (err) res.status(501).redirect('../');
          else res.send(html);
        });
      },
      () => {
        res.status(307).redirect('../auth/login');
      },
    );
  }

  @Get('MedicationCounseling')
  async getMedicationCounseling(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const allModules = await this.ms.getModulesByCategory(ModuleCategory.MED);

    if (!allModules.length) {
      res.render('404', {
        errorMessage: 'There are no Medication Modules Available Yet!',
      });
      return;
    }

    // console.log(allModules);
    res.render('Medication', { allModules });
  }

  @Post('Medication')
  getMedicationSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
  }

  @Get('EntrepreneurshipCounseling')
  async getEntrepreneurshipCounseling(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const allModules = await this.ms.getModulesByCategory(
      ModuleCategory.ENTREPRENEURSHIP,
    );
    if (!allModules.length) {
      res.render('404', {
        errorMessage: 'There are no Entrepreneurship Modules Available Yet!',
      });
      return;
    }
    // console.log(allModules);
    res.render('Entrepreneurship', { allModules });
  }

  @Post('Entrepreneurship')
  getEntrepreneurshipSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
  }

  @Get('CareerCounseling')
  async getCareerCounseling(@Req() req: Request, @Res() res: Response) {
    const allModules = await this.ms.getModulesByCategory(
      ModuleCategory.CAREER,
    );
    if (!allModules.length) {
      res.render('404', {
        errorMessage: 'There are no Career Modules Available Yet!',
      });
      return;
    }
    // console.log(allModules);
    res.render('Career', { allModules });
  }

  @Post('Career')
  getCareerSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
  }

  @Get('DietCounseling')
  async getDietCounseling(@Req() req: Request, @Res() res: Response) {
    const allModules = await this.ms.getModulesByCategory(ModuleCategory.DIET);
    if (!allModules.length) {
      console.log('rendering 404');
      res.render('404', {
        errorMessage: 'There are no Diet Modules Available Yet!',
      });
      return;
    }
    // console.log(allModules);
    console.log('rendering diet');
    res.render('Diet', { allModules });
  }

  @Post('Diet')
  getDietSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
  }

  @Get('Products')
  @Render('ProductSelling.ejs')
  getProducts(@Req() req: Request, @Res() res: Response): any {
    res.redirect('../listofallproducts');
  }

  @Get('Articles')
  @Render('Articles.ejs')
  getArticle(@Req() req: Request, @Res() res: Response): any {}

  @Get('UserDashboard')
  getUserDashboard(@Req() req: Request, @Res() res: Response) {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('UserDashboard', {});
      },
      () => {
        res.render('404', { errorMessage: 'Please Log In First!' });
      },
    );
  }
  @Get('UserOrders')
  getUserOrders(@Req() req: Request, @Res() res: Response) {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        // Fetch All UserOrders
      },
      () => {},
    );
  }
}
