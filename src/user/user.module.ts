import { Module } from '@nestjs/common';
import { SessionExecutorService } from '../session-executor/session-executor.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [SessionExecutorService],
})
export class UserModule {}
