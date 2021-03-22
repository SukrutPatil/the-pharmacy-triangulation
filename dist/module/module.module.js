"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleModule = void 0;
const common_1 = require("@nestjs/common");
const module_service_1 = require("./module.service");
const module_controller_1 = require("./module.controller");
const database_module_1 = require("../database/database.module");
let ModuleModule = class ModuleModule {
};
ModuleModule = __decorate([
    common_1.Module({
        providers: [module_service_1.ModuleService],
        controllers: [module_controller_1.ModuleController],
        exports: [module_service_1.ModuleService],
        imports: [database_module_1.DatabaseModule]
    })
], ModuleModule);
exports.ModuleModule = ModuleModule;
//# sourceMappingURL=module.module.js.map