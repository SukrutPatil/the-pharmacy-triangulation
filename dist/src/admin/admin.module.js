"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const session_executor_service_1 = require("./../session-executor/session-executor.service");
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const database_service_1 = require("../database/database.service");
const model_service_1 = require("../model/model.service");
const security_service_1 = require("../security/security.service");
const module_service_1 = require("../module/module.service");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    common_1.Module({
        controllers: [admin_controller_1.AdminController],
        providers: [session_executor_service_1.SessionExecutorService, database_service_1.DatabaseService, model_service_1.ModelService, security_service_1.SecurityService, module_service_1.ModuleService],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map