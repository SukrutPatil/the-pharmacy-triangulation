import { Module } from '@nestjs/common';
import { SessionExecutorService } from './session-executor.service';

@Module({
  providers: [SessionExecutorService],
})
export class SessionExecutorModule {}
