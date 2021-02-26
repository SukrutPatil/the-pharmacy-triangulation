"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const security_service_1 = require("./security/security.service");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_service_1 = require("./database/database.service");
const model_service_1 = require("./model/model.service");
const auth_module_1 = require("./auth/auth.module");
const security_module_1 = require("./security/security.module");
const admin_module_1 = require("./admin/admin.module");
const model_module_1 = require("./model/model.module");
const session_executor_module_1 = require("./session-executor/session-executor.module");
const user_module_1 = require("./user/user.module");
const platform_express_1 = require("@nestjs/platform-express");
const products_module_1 = require("./products/products.module");
const products_service_1 = require("./products/products.service");
const module_service_1 = require("./module/module.service");
const module_controller_1 = require("./module/module.controller");
const database_module_1 = require("./database/database.module");
const api_module_1 = require("./api/api.module");
const payment_module_1 = require("./payment/payment.module");
const module_module_1 = require("./module/module.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            security_module_1.SecurityModule,
            admin_module_1.AdminModule,
            model_module_1.ModelModule,
            session_executor_module_1.SessionExecutorModule,
            user_module_1.UserModule,
            platform_express_1.MulterModule.register({
                dest: './uploads'
            }),
            products_module_1.ProductsModule,
            database_module_1.DatabaseModule,
            api_module_1.ApiModule,
            payment_module_1.PaymentModule,
            module_module_1.ModuleModule
        ],
        controllers: [app_controller_1.AppController, module_controller_1.ModuleController,],
        providers: [app_service_1.AppService,
            database_service_1.DatabaseService, model_service_1.ModelService, security_service_1.SecurityService, products_service_1.ProductsService, module_service_1.ModuleService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map