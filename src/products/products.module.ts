import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService,DatabaseService],
  imports: []
})
export class ProductsModule {}
