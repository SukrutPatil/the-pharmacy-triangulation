import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EntryType, QueryStatus } from '../database/database.service'
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly DBService: DatabaseService) {

  }
  @Get('login')
  @Render('Login.ejs')
  getLoginPage(): any {
    return {};
  }

  getSignupPage() {
    throw new Error('Method not implemented.');
  }

  @Post('login')
  async postLoginInformation(@Req() req: Request, @Res() res: Response): Promise<any> {
    const { email, password } = req.body;
    const theResultSet = await this.DBService.retrieve(EntryType.MEMBER, `where email = ${email} AND password = ${password}`);
    if (theResultSet.status == QueryStatus.FAILED) {
      // It means there has been an SQLException
      res.status(501).redirect("../");
    }
    else {
      //Check out the result object
      const theResultObject = theResultSet.resultObject;
      // The ResultObject is basically array(row) of objects(values)
      // If no rows are found, it means user not exists
      if (theResultObject.rowCount == 0) {
        // Render the login page again,but with additional info warning
        res.render('Login', { userNotFound: true }, (err: Error, html: String) => { if (err) res.status(501).send('../'); else res.send(html); })
      }
      //If there is only one row, it means the user has been found
      else if (theResultObject.rowCount == 1) {
        // First write the session object
        req.session.loggedInUser = theResultObject.rows[0].name; // The Name of User
        //Redirect to all modules page
        res.redirect('../user/allModules');
      }
      // If there are more than one row 
      else {
        // Client has nothing to do with this, this is a data-redundancy issue
        // So we will just log this issue to the server log
        console.log(`Multiple Rows Captured At Database on entering email = ${email} and password = ${password}`);
        // And redirect the client to the homepage with error code 501 i.e. Internal Server Error
        res.status(501).redirect("../")
      }

    }
  }
  postSignupInformation() {
    throw new Error('Method not implemented.');
  }
  signoutAction() {
    throw new Error('Method not implemented.');
  }

}
