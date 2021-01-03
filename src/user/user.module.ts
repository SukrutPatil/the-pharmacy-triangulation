import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ModuleService } from '../module/module.service';
import { SessionExecutorService } from '../session-executor/session-executor.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [SessionExecutorService,ModuleService,DatabaseService],
})
export class UserModule {}
