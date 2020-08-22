import { Controller, Get, Redirect, Render, Post,Req,Res } from '@nestjs/common';
import {Request,Response} from 'express'
@Controller('member')
export class MemberController {
    @Get()
    @Redirect('./login')
    redirectToLogin():void {
        //Redirects to Login
    }
    
    @Get('login')
    @Render('Login.pug')
    renderLoginPage():void {
        //Renders Login Page
    }
    @Get('signup')
    @Render('SignUp.pug')
    renderSignUpPage():void{
        //Renders Signup Page
    }
    @Post('login')
    loginAction(@Req() req:Request,@Res() res:Response):void {
        //Login Validation
    }
    @Post('signup')
    signupAction(@Req() req:Request,@Res() res:Response):void {
        //Signup Validation
    }



}

