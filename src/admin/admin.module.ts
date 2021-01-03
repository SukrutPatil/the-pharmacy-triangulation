import { SessionExecutorService } from './../session-executor/session-executor.service';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { DatabaseService } from '../database/database.service';
import { ModelService } from '../model/model.service';
import { SecurityService } from '../security/security.service';
import { ModuleService } from '../module/module.service';

@Module({
  controllers: [AdminController],
  providers: [SessionExecutorService,DatabaseService,ModelService,SecurityService,ModuleService],
})
export class AdminModule {}
