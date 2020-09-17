import { Controller, Get, Post, Render } from '@nestjs/common';
import { JSGAuth } from './JSGAuth';
@Controller('auth')
export class AuthController extends JSGAuth {
  @Get('login')
  @Render('Login.ejs')
  getLoginPage(): any {
    return {};
  }

  getSignupPage() {
    throw new Error('Method not implemented.');
  }

  @Post('login')
  postLoginInformation() {
    throw new Error('Method not implemented.');
  }
  postSignupInformation() {
    throw new Error('Method not implemented.');
  }
  signoutAction() {
    throw new Error('Method not implemented.');
  }
  /****
   * 1.
   */
}
