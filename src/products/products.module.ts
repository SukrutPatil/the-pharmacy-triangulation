import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from '../database/database.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService,DatabaseService],
  imports: [DatabaseModule],
  exports: [ProductsService]
})
export class ProductsModule {}
