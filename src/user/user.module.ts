import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ModuleModule } from 'src/module/module.module';
import { SessionExecutorModule } from 'src/session-executor/session-executor.module';

import { UserController } from './user.controller';
/***  */
@Module({
  controllers: [UserController],
  providers: [],
  imports: [SessionExecutorModule,ModuleModule,DatabaseModule]
})
export class UserModule {}
