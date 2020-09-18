import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('Homepage.ejs')
  getHomePage(): any {
    return { loggedInUser: '' };
  }

  @Get('aboutUs')
  @Render('AboutUs.ejs')
  getAboutUSPage(): any {
    return {};
  }
}
