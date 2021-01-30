import { SecurityService } from './../security/security.service';
import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { SecurityModule } from 'src/security/security.module';

@Module({
  providers: [ModelService],
  exports: [ModelService],
  imports: [SecurityModule]
})
export class ModelModule {}
