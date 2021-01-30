import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [DatabaseModule],
})
export class ApiModule {}
