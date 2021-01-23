import { SecurityService } from './security/security.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { ModelService } from './model/model.service';

// Services
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { AdminModule } from './admin/admin.module';
import { ModelModule } from './model/model.module';
import { SessionExecutorModule } from './session-executor/session-executor.module';
import { UserModule } from './user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';
import { ModuleService } from './module/module.service';

import { ModuleController } from './module/module.controller';

import { OrderService } from './order/order.service';
import {OrderModule} from './order/order.module'
@Module({
  imports: [
    AuthModule,
    SecurityModule,
    AdminModule,
    ModelModule,
    SessionExecutorModule,
    UserModule,
    MulterModule.register({
      dest: './uploads'
    }),
    ProductsModule,
    OrderModule
  ],
  controllers: [AppController,  ModuleController],
  providers: [AppService, DatabaseService, ModelService, SecurityService,ProductsService, ModuleService, OrderService],
})
export class AppModule { }
