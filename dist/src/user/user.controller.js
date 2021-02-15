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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const session_executor_service_1 = require("../session-executor/session-executor.service");
const module_service_1 = require("../module/module.service");
let UserController = class UserController {
    constructor(se, ms) {
        this.se = se;
        this.ms = ms;
    }
    getAllModules(req, res) {
        this.se.sessionExecutor(req, res, () => {
            res.render('AllModules', {}, (err, html) => {
                if (err)
                    res.status(501).redirect('../');
                else
                    res.send(html);
            });
        }, () => {
            res.status(307).redirect('../auth/login');
        });
    }
    async getMedicationCounseling(req, res) {
        const allModules = await this.ms.getModulesByCategory(module_service_1.ModuleCategory.MED);
        if (!allModules.length) {
            res.render('404', {
                errorMessage: 'There are no Medication Modules Available Yet!',
            });
            return;
        }
        res.render('Medication', { allModules });
    }
    getMedicationSession(req, res) {
        const { name, email, pnNo, date, time } = req.body;
        throw 'expects further implementation';
    }
    async getEntrepreneurshipCounseling(req, res) {
        const allModules = await this.ms.getModulesByCategory(module_service_1.ModuleCategory.ENTREPRENEURSHIP);
        if (!allModules.length) {
            res.render('404', {
                errorMessage: 'There are no Entrepreneurship Modules Available Yet!',
            });
            return;
        }
        res.render('Entrepreneurship', { allModules });
    }
    getEntrepreneurshipSession(req, res) {
        const { name, email, pnNo, date, time } = req.body;
        throw 'expects further implementation';
    }
    async getCareerCounseling(req, res) {
        const allModules = await this.ms.getModulesByCategory(module_service_1.ModuleCategory.CAREER);
        if (!allModules.length) {
            res.render('404', {
                errorMessage: 'There are no Career Modules Available Yet!',
            });
            return;
        }
        res.render('Career', { allModules });
    }
    getCareerSession(req, res) {
        const { name, email, pnNo, date, time } = req.body;
        throw 'expects further implementation';
    }
    async getDietCounseling(req, res) {
        const allModules = await this.ms.getModulesByCategory(module_service_1.ModuleCategory.DIET);
        if (!allModules.length) {
            console.log('rendering 404');
            res.render('404', {
                errorMessage: 'There are no Diet Modules Available Yet!',
            });
            return;
        }
        console.log('rendering diet');
        res.render('Diet', { allModules });
    }
    getDietSession(req, res) {
        const { name, email, pnNo, date, time } = req.body;
        throw 'expects further implementation';
    }
    getProducts(req, res) {
        res.redirect('../listofallproducts');
    }
    getArticle(req, res) { }
    getUserDashboard(req, res) {
        this.se.sessionExecutor(req, res, () => {
            res.render('UserDashboard', {});
        }, () => {
            res.render('404', { errorMessage: 'Please Log In First!' });
        });
    }
    getUserOrders(req, res) {
        this.se.sessionExecutor(req, res, () => {
        }, () => { });
    }
};
__decorate([
    common_1.Get(['', 'AllModules']),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getAllModules", null);
__decorate([
    common_1.Get('MedicationCounseling'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMedicationCounseling", null);
__decorate([
    common_1.Post('Medication'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getMedicationSession", null);
__decorate([
    common_1.Get('EntrepreneurshipCounseling'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getEntrepreneurshipCounseling", null);
__decorate([
    common_1.Post('Entrepreneurship'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getEntrepreneurshipSession", null);
__decorate([
    common_1.Get('CareerCounseling'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCareerCounseling", null);
__decorate([
    common_1.Post('Career'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getCareerSession", null);
__decorate([
    common_1.Get('DietCounseling'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDietCounseling", null);
__decorate([
    common_1.Post('Diet'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getDietSession", null);
__decorate([
    common_1.Get('Products'),
    common_1.Render('ProductSelling.ejs'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getProducts", null);
__decorate([
    common_1.Get('Articles'),
    common_1.Render('Articles.ejs'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getArticle", null);
__decorate([
    common_1.Get('UserDashboard'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserDashboard", null);
__decorate([
    common_1.Get('UserOrders'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserOrders", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [session_executor_service_1.SessionExecutorService,
        module_service_1.ModuleService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map