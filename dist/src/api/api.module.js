"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const model_module_1 = require("../model/model.module");
const payment_module_1 = require("../payment/payment.module");
const payment_service_1 = require("../payment/payment.service");
const products_module_1 = require("../products/products.module");
const products_service_1 = require("../products/products.service");
const api_controller_1 = require("./api.controller");
const api_service_1 = require("./api.service");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        controllers: [api_controller_1.ApiController],
        providers: [api_service_1.ApiService],
        imports: [database_module_1.DatabaseModule, model_module_1.ModelModule, payment_module_1.PaymentModule, products_module_1.ProductsModule],
        exports: [api_service_1.ApiService]
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map