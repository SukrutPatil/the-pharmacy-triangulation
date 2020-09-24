import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { SessionExecutorService } from 'src/session-executor/session-executor.service';
import { Request, Response } from 'express';
import { throws } from 'assert';

@Controller('user')
// '' Will work for home page if User hasn't login yet
// if user logined, then it user/... routing will work
export class UserController {
  constructor(private readonly se: SessionExecutorService) {}

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
  @Render('Medication.ejs')
  getMedicationCounseling(@Req() req: Request, @Res() res: Response): any {}

  @Post('Medication')
  getMedicationSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
  }

  @Get('EntrepreneurshipCounseling')
  @Render('Entrepreneurship.ejs')
  getEntrepreneurshipCounseling(
    @Req() req: Request,
    @Res() res: Response,
  ): any {}

  @Post('Entrepreneurship')
  getEntrepreneurshipSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
  }

  @Get('CareerCounseling')
  @Render('Career.ejs')
  getCareerCounseling(@Req() req: Request, @Res() res: Response): any {}

  @Post('Career')
  getCareerSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
  }

  @Get('DietCounseling')
  @Render('Diet.ejs')
  getDietCounseling(@Req() req: Request, @Res() res: Response): any {}

  @Post('Diet')
  getDietSession(@Req() req: Request, @Res() res: Response): any {
    const { name, email, pnNo, date, time } = req.body;
    throw 'expects further implementation';
  }

  @Get('Products')
  @Render('ProductSelling.ejs')
  getProducts(@Req() req: Request, @Res() res: Response): any {}

  @Get('Articles')
  @Render('Articles.ejs')
  getArticle(@Req() req: Request, @Res() res: Response): any {}
}
