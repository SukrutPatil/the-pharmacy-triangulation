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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleController = void 0;
const common_1 = require("@nestjs/common");
const module_service_1 = require("./module.service");
let ModuleController = class ModuleController {
    constructor(ms) {
        this.ms = ms;
    }
    async getModuleById(id, res, req) {
        const theModule = await this.ms.getModuleById(id);
        if (!theModule)
            res.render('404', {});
        const theAuthor = await this.ms.getModuleAuthorName(id);
        console.log(theAuthor);
        res.render('Module', {
            theModule,
            theAuthor,
            id,
            loggedInUser: req.session.loggedInUser,
        });
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "getModuleById", null);
ModuleController = __decorate([
    common_1.Controller('module'),
    __metadata("design:paramtypes", [module_service_1.ModuleService])
], ModuleController);
exports.ModuleController = ModuleController;
//# sourceMappingURL=module.controller.js.map