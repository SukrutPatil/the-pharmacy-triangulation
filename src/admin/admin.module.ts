import { SessionExecutorService } from './../session-executor/session-executor.service';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { DatabaseService } from '../database/database.service';
import { ModelService } from '../model/model.service';

@Module({
  controllers: [AdminController],
  providers: [SessionExecutorService,DatabaseService,ModelService],
})
export class AdminModule {}
