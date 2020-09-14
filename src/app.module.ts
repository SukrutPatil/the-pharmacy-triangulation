import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { ModelService } from './model/model.service';


// Services 
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';

import { AdminModule } from './admin/admin.module';




@Module({
  imports: [AuthModule, SecurityModule,  AdminModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService, ModelService],
})
export class AppModule {}
