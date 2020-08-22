import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { ModelService } from './model/model.service';
import { SecurityService } from './security/security.service';



@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DatabaseService, ModelService, SecurityService],
})
export class AppModule {}
