import { Module } from '@nestjs/common';
import { SessionExecutorService } from './session-executor.service';

@Module({
  providers: [SessionExecutorService],exports:[SessionExecutorService]
})
export class SessionExecutorModule {}
