import { SecurityService } from './security/security.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { ModelService } from './model/model.service';


// Services 
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';

import { AdminModule } from './admin/admin.module';
import { ModelModule } from './model/model.module';
import { SessionExecutorModule } from './session-executor/session-executor.module';




@Module({
  imports: [AuthModule, SecurityModule,  AdminModule, ModelModule, SessionExecutorModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService, ModelService,SecurityService],
})
export class AppModule {}
