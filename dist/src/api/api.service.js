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
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const model_service_1 = require("../model/model.service");
let ApiService = class ApiService {
    constructor(db, ms) {
        this.db = db;
        this.ms = ms;
    }
    async getChats(moduleId) {
        const { error, resultObject } = await this.db.retrieve(database_service_1.EntryType.CHAT, `where moduleid = '${moduleId}'`);
        if (error)
            return null;
        return resultObject.rows;
    }
    async updateChat(moduleId, chatter, chat) {
        const chatObject = this.ms.createChatObject(moduleId, chatter, chat);
        const { error } = await this.db.addChat(chatObject);
        if (error)
            return false;
        return true;
    }
    async newMember({ name, email, phone, password, type }) {
    }
    async saveAddress(al1, al2, al3, pincode) {
        const theAddressObject = this.ms.createAddressObject(al1, al2, al3, pincode);
        this.session_address = Object.assign({}, theAddressObject);
        const { error } = await this.db.addAddress(theAddressObject);
        console.log(error);
        return error ? false : true;
    }
};
ApiService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService, model_service_1.ModelService])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map