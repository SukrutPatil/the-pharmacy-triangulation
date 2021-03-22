import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [ModuleService],
  controllers: [ModuleController],
  exports: [ModuleService],
  imports:[DatabaseModule]
})
export class ModuleModule {}
