import { Controller, Get, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {Request} from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('Homepage.ejs')
  getHomePage(@Req() req:Request): any {
    return { loggedInUser: req.session.loggedInUser };
  }

  @Get('aboutUs')
  @Render('AboutUs.ejs')
  getAboutUSPage(): any {
    return {};
  }
}
