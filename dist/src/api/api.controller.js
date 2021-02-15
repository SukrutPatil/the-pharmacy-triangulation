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
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("./api.service");
const payment_service_1 = require("../payment/payment.service");
const model_service_1 = require("../model/model.service");
const database_service_1 = require("../database/database.service");
let ApiController = class ApiController {
    constructor(apiService, paymentService, ms, db) {
        this.apiService = apiService;
        this.paymentService = paymentService;
        this.ms = ms;
        this.db = db;
    }
    async fetchCurrentChat(moduleId) {
        const chats = await this.apiService.getChats(moduleId);
        return { chats };
    }
    async updateChat(body, req) {
        console.log(body);
        const { chat, theModuleId } = body;
        const chatter = req.session.loggedInUser;
        const done = await this.apiService.updateChat(theModuleId, chatter, chat);
        console.log(done);
        return { done };
    }
    async newMember(body, req) {
        const { name, email, phone, password, type } = body;
        console.log(name, email, phone, password, type);
    }
    async getCheckoutForProduct(product_id) {
        const checkoutOptions = await this.paymentService.getCheckoutOptionsForProduct(product_id);
        return { checkoutOptions };
    }
    async postPaymentOfProducts(body) {
        console.log(body);
        const { razorpay_payment_id } = body;
        return { thanks: 'thanks' };
    }
    async saveAddress(body) {
        const { al1, al2, al3, pincode } = body;
        const done = await this.apiService.saveAddress(al1, al2, al3, pincode);
        return { done };
    }
};
__decorate([
    common_1.Get('fetchChat/:modId'),
    __param(0, common_1.Param('modId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "fetchCurrentChat", null);
__decorate([
    common_1.Post('updateChat'),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "updateChat", null);
__decorate([
    common_1.Post('becomeAMember'),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "newMember", null);
__decorate([
    common_1.Get('getCheckoutForProduct/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getCheckoutForProduct", null);
__decorate([
    common_1.Post('checkoutdone'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "postPaymentOfProducts", null);
__decorate([
    common_1.Post('saveAddress'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "saveAddress", null);
ApiController = __decorate([
    common_1.Controller('api'),
    __metadata("design:paramtypes", [api_service_1.ApiService, payment_service_1.PaymentService, model_service_1.ModelService, database_service_1.DatabaseService])
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map