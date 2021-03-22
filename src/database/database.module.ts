import { Module } from '@nestjs/common';
import { ModelModule } from 'src/model/model.module';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],exports:[DatabaseService],imports:[ModelModule]
})
export class DatabaseModule {}
