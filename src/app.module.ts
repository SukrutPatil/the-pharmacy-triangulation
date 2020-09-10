import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { ModelService } from './model/model.service';



import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { CounselingModule } from './counseling/counseling.module';



@Module({
  imports: [AuthModule, SecurityModule, ProductModule, AdminModule, CounselingModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService, ModelService],
})
export class AppModule {}
