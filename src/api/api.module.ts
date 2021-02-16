import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ModelModule } from 'src/model/model.module';
import { PaymentModule } from 'src/payment/payment.module';
import { PaymentService } from 'src/payment/payment.service';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [DatabaseModule, ModelModule, PaymentModule, ProductsModule],
  exports:[ApiService]
})
export class ApiModule {}
