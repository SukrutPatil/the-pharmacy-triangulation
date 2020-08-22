import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { ModelService } from './model/model.service';
import { SecurityService } from './security/security.service';
import { LoginController } from './login/login.controller';



@Module({
  imports: [],
  controllers: [AppController, LoginController],
  providers: [AppService, DatabaseService, ModelService, SecurityService],
})
export class AppModule {}
