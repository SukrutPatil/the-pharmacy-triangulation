exports.id = 0;
exports.modules = {

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const security_service_1 = __webpack_require__(7);
const common_1 = __webpack_require__(8);
const app_controller_1 = __webpack_require__(10);
const app_service_1 = __webpack_require__(12);
const database_service_1 = __webpack_require__(13);
const model_service_1 = __webpack_require__(17);
const auth_module_1 = __webpack_require__(19);
const security_module_1 = __webpack_require__(22);
const admin_module_1 = __webpack_require__(23);
const model_module_1 = __webpack_require__(32);
const session_executor_module_1 = __webpack_require__(31);
const user_module_1 = __webpack_require__(35);
const platform_express_1 = __webpack_require__(26);
const products_module_1 = __webpack_require__(37);
const products_service_1 = __webpack_require__(16);
const module_service_1 = __webpack_require__(30);
const module_controller_1 = __webpack_require__(34);
const database_module_1 = __webpack_require__(20);
const api_module_1 = __webpack_require__(39);
const payment_module_1 = __webpack_require__(40);
const module_module_1 = __webpack_require__(33);
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


/***/ })

};