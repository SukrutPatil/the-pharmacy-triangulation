"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const model_module_1 = require("./model/model.module");
const module_service_1 = require("./module/module.service");
const module_module_1 = require("./module/module.module");
const payment_module_1 = require("./payment/payment.module");
const products_module_1 = require("./products/products.module");
const security_module_1 = require("./security/security.module");
const session_executor_module_1 = require("./session-executor/session-executor.module");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule, model_module_1.ModelModule, module_module_1.ModuleModule, payment_module_1.PaymentModule, products_module_1.ProductsModule, security_module_1.SecurityModule, session_executor_module_1.SessionExecutorModule, user_module_1.UserModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, module_service_1.ModuleService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map