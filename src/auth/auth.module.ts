import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers:[DatabaseService]
})
export class AuthModule {}
