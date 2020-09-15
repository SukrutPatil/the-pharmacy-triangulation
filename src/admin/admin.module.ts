import { SessionExecutorService } from './../session-executor/session-executor.service';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

@Module({
  controllers: [AdminController],
  providers: [SessionExecutorService]
})
export class AdminModule {}