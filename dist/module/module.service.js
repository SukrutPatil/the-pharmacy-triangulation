"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ModuleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleService = exports.ModuleCategory = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
var ModuleCategory;
(function (ModuleCategory) {
    ModuleCategory["MED"] = "Medication Counseling";
    ModuleCategory["DIET"] = "Diet Counseling";
    ModuleCategory["CAREER"] = "Career Counseling";
    ModuleCategory["ENTREPRENEURSHIP"] = "Entrepreneurship Counseling";
})(ModuleCategory = exports.ModuleCategory || (exports.ModuleCategory = {}));
let ModuleService = ModuleService_1 = class ModuleService {
    constructor(db) {
        this.db = db;
        console.debug(`ModuleService ${ModuleService_1.callTimes++}`);
    }
    async getAllModules() {
        const dbReturnObject = await this.db.retrieve(database_service_1.EntryType.MODULE);
        if (dbReturnObject.error) {
            console.error(dbReturnObject.error);
            return null;
        }
        const allRows = dbReturnObject.resultObject;
        return allRows;
    }
    async getModulesByCategory(cat) {
        const allModules = await this.getAllModules();
        if (!allModules.length)
            return null;
        const filteredModules = allModules.filter((module) => module.category === cat);
        console.log(filteredModules);
        return filteredModules;
    }
    async getModuleById(id) {
        const allModules = await this.getAllModules();
        if (!allModules.length)
            return null;
        const filteredModule = allModules.find((module) => module.id === id);
        return filteredModule;
    }
    async getModuleAuthorName(id) {
        const { adminemail } = await this.getModuleById(id);
        const members = (await this.db.retrieve(database_service_1.EntryType.MEMBER)).resultObject;
        const theAuthorName = members.find((m) => m.email === adminemail).name;
        return theAuthorName;
    }
};
ModuleService.callTimes = 0;
ModuleService = ModuleService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ModuleService);
exports.ModuleService = ModuleService;
//# sourceMappingURL=module.service.js.map