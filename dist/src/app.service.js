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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("./database/database.service");
let AppService = class AppService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async getRandomArrayOfModules() {
        let modulesQueryReturn = await this.dbService.retrieve(database_service_1.EntryType.MODULE);
        if (modulesQueryReturn.error) {
            console.log(modulesQueryReturn.error);
            return null;
        }
        if (modulesQueryReturn.resultObject.rows.length == 0) {
            console.log('No Modules Available Yet!');
            return [];
        }
        return this.shuffle(modulesQueryReturn.resultObject.rows);
    }
    shuffle(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map