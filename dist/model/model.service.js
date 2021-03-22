"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelService = exports.ModuleType = exports.dateFetch = void 0;
const common_1 = require("@nestjs/common");
const crypticKeyGenerator = require("crypto-random-string");
const dateFetch = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
};
exports.dateFetch = dateFetch;
var ModuleType;
(function (ModuleType) {
    ModuleType[ModuleType["DIET"] = 0] = "DIET";
    ModuleType[ModuleType["CAREER"] = 1] = "CAREER";
    ModuleType[ModuleType["ENTREPRENEURSHIP"] = 2] = "ENTREPRENEURSHIP";
    ModuleType[ModuleType["MEDICATION"] = 3] = "MEDICATION";
})(ModuleType = exports.ModuleType || (exports.ModuleType = {}));
var RandomIdType;
(function (RandomIdType) {
    RandomIdType[RandomIdType["TRANSACTION"] = 0] = "TRANSACTION";
    RandomIdType[RandomIdType["PRODUCT"] = 1] = "PRODUCT";
    RandomIdType[RandomIdType["MODULE"] = 2] = "MODULE";
    RandomIdType[RandomIdType["ARTICLE"] = 3] = "ARTICLE";
    RandomIdType[RandomIdType["SESSION"] = 4] = "SESSION";
    RandomIdType[RandomIdType["CHAT"] = 5] = "CHAT";
    RandomIdType[RandomIdType["ADDRESS"] = 6] = "ADDRESS";
})(RandomIdType || (RandomIdType = {}));
let ModelService = class ModelService {
    constructor() {
        this.generateUniqueID = (rt) => {
            let prefix;
            switch (rt) {
                case RandomIdType.PRODUCT:
                    prefix = `PRO`;
                    break;
                case RandomIdType.MODULE:
                    prefix = `MOD`;
                    break;
                case RandomIdType.TRANSACTION:
                    prefix = `TRS`;
                    break;
                case RandomIdType.ARTICLE:
                    prefix = `ART`;
                    break;
                case RandomIdType.SESSION:
                    prefix = 'SESS';
                    break;
                case RandomIdType.CHAT:
                    prefix = 'CHAT';
                    break;
                case RandomIdType.ADDRESS:
                    prefix = 'ADDR';
                    break;
            }
            const suffix = crypticKeyGenerator({ length: 7 }) + Date.now().toString();
            return `${prefix}${suffix}`;
        };
    }
};
ModelService = __decorate([
    common_1.Injectable()
], ModelService);
exports.ModelService = ModelService;
//# sourceMappingURL=model.service.js.map