import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { SessionExecutorService } from 'src/session-executor/session-executor.service';
import { Request, Response } from 'express';
import { throws } from 'assert';

@Controller('user')
// '' Will work for home page if User hasn't login yet
// if user logined, then it user/... routing will work
export class UserController {
  constructor(private readonly se: SessionExecutorService) {}

  @Get('membership')
  getMembersipForm(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('MembershipBuying', {}, (err: Error, html: String) => {
          if (err) res.status(501).redirect('../');
          else res.send(html);
        });
      },
      () => {
        res.status(307).redirect('../auth/login');
      },
    );
  }

  @Post('membershipBuying')
  getMembership(@Req() req: Request, @Res() res: Response): any {
    throw 'Method Yet to be implemented';
  }

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

  @Post('Diet')
  getDietSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
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

  @Get('Articles')
  getArticle(@Req() req: Request, @Res() res: Response): any {
    this.se.sessionExecutor(
      req,
      res,
      () => {
        res.render('Articles', {});
      },
      () => {
        res.status(301).redirect('../auth/login');
      },
    );
  }
}
