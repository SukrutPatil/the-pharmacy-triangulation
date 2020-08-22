import { ModelService } from './../model/model.service';
import { DatabaseService } from './../database/database.service';
import { Controller, Get, Render, Post, Body, Req, Session } from '@nestjs/common';

@Controller('login')
export class LoginController {
    constructor(private db:DatabaseService,private model:ModelService) {

    }
    @Get()
    @Render('login.pug')
    redirectLoginPage():any {
        return {}
    }
    @Post()
    loginAction(@Session() theRequestSession,@Body() theRequestBody):any {
        //Validate Login
    }
    
}
