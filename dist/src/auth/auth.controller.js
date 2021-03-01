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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const database_service_2 = require("../database/database.service");
let AuthController = class AuthController {
    constructor(DBService) {
        this.DBService = DBService;
    }
    getLoginPage() {
        return {};
    }
    getSignupPage() {
        throw new Error('Method not implemented.');
    }
    async postLoginInformation(req, res) {
        const { email, password } = req.body;
        const theResultSet = await this.DBService.retrieve(database_service_2.EntryType.MEMBER, `where email = '${email}'`);
        if (theResultSet.status == database_service_2.QueryStatus.FAILED) {
            console.log('Here');
            console.log(theResultSet.error);
            res.status(501).redirect('../');
        }
        else {
            const theResultObject = theResultSet.resultObject;
            if (theResultObject.rowCount == 0) {
                console.log('Zero');
                res.render('Login', { userNotFound: true }, (err, html) => {
                    if (err)
                        res.status(501).send('../');
                    else
                        res.send(html);
                });
            }
            else if (theResultObject.rowCount == 1) {
                console.log('One');
                req.session.loggedInUser = theResultObject[0].name;
                res.redirect('../');
            }
            else {
                console.log('More than one');
                console.log(`Multiple Rows Captured At Database on entering email = ${email} and password = ${password}`);
                res.status(501).redirect('../');
            }
        }
    }
    getMembersipForm(req, res) {
        return {};
    }
    signoutAction(req, res) {
        var _a;
        delete req.session.loggedInUser;
        (_a = req.session) === null || _a === void 0 ? true : delete _a.adminEmail;
        res.redirect('./login');
    }
};
__decorate([
    common_1.Get('login'),
    common_1.Render('Login.ejs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AuthController.prototype, "getLoginPage", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "postLoginInformation", null);
__decorate([
    common_1.Get('membership'),
    common_1.Render('BecomeAMember.ejs'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "getMembersipForm", null);
__decorate([
    common_1.Get('signout'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "signoutAction", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map