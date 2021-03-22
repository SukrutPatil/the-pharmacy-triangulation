import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ModelModule } from './model/model.module';
import { ModuleService } from './module/module.service';
import { ModuleModule } from './module/module.module';
import { PaymentModule } from './payment/payment.module';
import { ProductsModule } from './products/products.module';
import { SecurityModule } from './security/security.module';
import { SessionExecutorModule } from './session-executor/session-executor.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, ModelModule, ModuleModule, PaymentModule, ProductsModule, SecurityModule, SessionExecutorModule, UserModule],
  controllers: [AppController],
  providers: [AppService, ModuleService],
})
export class AppModule {}
