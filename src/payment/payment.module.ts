import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { PaymentService } from './payment.service';

@Module({
  providers: [PaymentService],exports:[PaymentService],imports:[ProductsModule]
})
export class PaymentModule {}
