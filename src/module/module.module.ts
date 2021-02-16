import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';

@Module({
    exports: [ModuleService],
    providers: [ModuleService],
    imports: [DatabaseModule],
    controllers:[ModuleController]
})
export class ModuleModule {}
