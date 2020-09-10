import { Module } from '@nestjs/common';
import { CounselingController } from './counseling.controller';

@Module({
  controllers: [CounselingController]
})
export class CounselingModule {}
