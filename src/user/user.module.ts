import { Module } from '@nestjs/common';
import { ModuleModule } from 'src/module/module.module';
import { SessionExecutorModule } from 'src/session-executor/session-executor.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],imports:[SessionExecutorModule,ModuleModule]
})
export class UserModule {}
