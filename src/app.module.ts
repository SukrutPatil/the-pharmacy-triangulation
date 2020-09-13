import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { ModelService } from './model/model.service';


// Services 
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { ProductModule } from './services/product/product.module';
import { AdminModule } from './admin/admin.module';
import { CounselingModule } from './services/counseling/counseling.module';
import { BlogModule } from './services/blog/blog.module';



@Module({
  imports: [AuthModule, SecurityModule, ProductModule, AdminModule, CounselingModule,BlogModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService, ModelService],
})
export class AppModule {}
