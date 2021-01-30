import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from '../database/database.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports:[DatabaseModule]
})
export class AuthModule {}
