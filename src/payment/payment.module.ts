import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { PaymentService } from './payment.service';

@Module({
  providers: [PaymentService, ProductsService],
  imports:[ProductsModule,DatabaseModule]

})
export class PaymentModule {}
