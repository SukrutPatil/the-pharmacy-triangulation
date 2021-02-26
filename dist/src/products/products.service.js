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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ProductsService = class ProductsService {
    constructor(dbService) {
        this.dbService = dbService;
        console.log('ProductsService Initialized');
    }
    async getAllProducts() {
        const dbReturnObject = await this.dbService.retrieve(database_service_1.EntryType.DRUG);
        if (dbReturnObject.error) {
            return null;
        }
        const allRows = dbReturnObject.resultObject.rows;
        return allRows;
    }
    async getParticularProduct(id) {
        const allProducts = await this.getAllProducts();
        if (!allProducts) {
            return null;
        }
        const theProduct = allProducts.find((product) => {
            return product.id === id;
        });
        return theProduct ? theProduct : null;
    }
};
ProductsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map