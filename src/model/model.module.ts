import { SecurityService } from './../security/security.service';
import { Module } from '@nestjs/common';
import { ModelService } from './model.service';

@Module({
  providers: [ModelService,SecurityService]
})
export class ModelModule {}
