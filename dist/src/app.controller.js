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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const database_service_1 = require("./database/database.service");
const products_service_1 = require("./products/products.service");
let AppController = class AppController {
    constructor(db, ps, as) {
        this.db = db;
        this.ps = ps;
        this.as = as;
    }
    async getHomePage(req, res) {
        console.log(`Entering HomePage`);
        let allModules = await this.as.getRandomArrayOfModules();
        console.log(allModules);
        const theDBReturnObject = await this.db.retrieve(database_service_1.EntryType.DRUG);
        const prod_id = [];
        const prod_name = [];
        const prod_price = [];
        const prod_img = [];
        if (theDBReturnObject.error) {
            console.debug(`Error Here`);
            res.status(501);
        }
        theDBReturnObject.resultObject.forEach(productEntry => {
            const { id, brandname, mrp, imgaddress } = productEntry;
            prod_id.push(id);
            prod_name.push(brandname);
            prod_price.push(mrp);
            prod_img.push(imgaddress);
        });
        return {
            loggedInUser: req.session.loggedInUser,
            prod_id,
            prod_name: prod_name,
            prod_price: prod_price,
            prod_img: prod_img,
            allModules
        };
    }
    async getListOfAllProductsPage(res) {
        const allProducts = await this.ps.getAllProducts();
        if (!allProducts)
            res.render('404', { errorMessage: 'No Products found in database. ' });
        res.render('ListOfAllProducts', { allProducts });
    }
    getAboutUSPage() {
        return {};
    }
};
__decorate([
    common_1.Get(),
    common_1.Render('Homepage.ejs'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHomePage", null);
__decorate([
    common_1.Get('listOfAllProducts'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getListOfAllProductsPage", null);
__decorate([
    common_1.Get('aboutUs'),
    common_1.Render('AboutUs.ejs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getAboutUSPage", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        products_service_1.ProductsService,
        app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map