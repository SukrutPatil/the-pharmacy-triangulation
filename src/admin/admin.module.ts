
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

import { SessionExecutorModule } from 'src/session-executor/session-executor.module';
import { DatabaseModule } from 'src/database/database.module';
import { ModelModule } from 'src/model/model.module';
import { SecurityModule } from 'src/security/security.module';
import { ModuleModule } from 'src/module/module.module';

@Module({
  controllers: [AdminController],

  imports:[SessionExecutorModule,DatabaseModule,ModelModule,SecurityModule,ModuleModule]
})
export class AdminModule {}
