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
exports.AdminController = void 0;
const session_executor_service_1 = require("./../session-executor/session-executor.service");
const common_1 = require("@nestjs/common");
const model_service_1 = require("../model/model.service");
const database_service_1 = require("../database/database.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
const mime = require("mime");
const fs = require("fs");
const module_service_1 = require("../module/module.service");
let theFileName = '', theModuleThumbnail = '', theModuleVideo = '';
let theOtherImagesArray = [];
let self;
const multerOptions = {
    storage: multer.diskStorage({
        destination: (_, file, cb) => {
            if (file.fieldname == 'product_thumbnail')
                return cb(null, './uploads/products');
            else if (file.fieldname == 'article_thumbnail')
                return cb(null, './uploads/articles/thumbnail');
            else if (file.fieldname == 'article_otherimages[]')
                return cb(null, './uploads/articles/other');
            else if (file.fieldname == 'moduleThumbnail')
                return cb(null, './uploads/modules/thumbnail');
            else if (file.fieldname == 'moduleVideo')
                return cb(null, './uploads/modules/video');
        },
        filename: (_, file, cb) => {
            const match = ['image/png', 'image/jpeg', 'video/mp4'];
            if (match.indexOf(file.mimetype) === -1) {
                const errorMessage = {
                    message: 'Invalid File',
                    name: 'INVALID_EXTENSION',
                };
                return cb(errorMessage, null);
            }
            let filename;
            if (file.fieldname.startsWith('article'))
                filename = `ART${Date.now()}.${mime.getExtension(file.mimetype)}`;
            else
                filename = `${file.fieldname}-${Date.now()}.${mime.getExtension(file.mimetype)}`;
            if (file.fieldname != 'article_otherimages[]')
                theFileName = filename;
            if (file.fieldname == 'article_otherimages[]')
                theOtherImagesArray.push(theFileName);
            if (file.fieldname == 'moduleThumbnail')
                theModuleThumbnail = filename;
            if (file.fieldname == 'moduleVideo')
                theModuleVideo = filename;
            return cb(null, filename);
        },
    }),
};
let AdminController = class AdminController {
    constructor(se, mg, db, ms) {
        this.se = se;
        this.mg = mg;
        this.db = db;
        this.ms = ms;
    }
    getAdminLogin() {
        return { userNotFoundError: 'No' };
    }
    async adminLoginAction(req, res) {
        const { adminEmail, adminPassword } = req.body;
        const theDatabaseReturnObject = await this.db.retrieve(database_service_1.EntryType.MEMBER, `where email = '${adminEmail}' and admin = 'yes' and password = '${adminPassword}'`);
        if (theDatabaseReturnObject.error) {
            console.debug(theDatabaseReturnObject.error);
        }
        if (theDatabaseReturnObject.resultObject.length == 0) {
            console.debug(`No Admin Found`);
        }
        else if (theDatabaseReturnObject.resultObject.length != 1) {
            console.debug(`Internal Error: 501`);
        }
        else {
            req.session.loggedInUser =
                theDatabaseReturnObject.resultObject[0].name;
            req.session.adminEmail = adminEmail;
            res.redirect('products');
        }
    }
    getProducts(req, res) {
        this.se.adminSessionExecutor(req, res, async () => {
            const { adminEmail } = req.session;
            const theDBReturnObject = await this.db.retrieve(database_service_1.EntryType.DRUG, `where adminemail = '${adminEmail}'`);
            if (theDBReturnObject.error) {
                console.debug(theDBReturnObject.error);
                res.status(501).redirect('../');
            }
            else {
                const allRows = theDBReturnObject === null || theDBReturnObject === void 0 ? void 0 : theDBReturnObject.resultObject;
                const arrayOfProductIds = [];
                const arrayOfImageAddresses = [];
                const arrayOfRegularPrices = [];
                const arrayOfSalePrices = [];
                const arrayOfBrandNames = [];
                allRows.forEach(row => {
                    arrayOfProductIds.push(row.id);
                    arrayOfImageAddresses.push(row.imgaddress);
                    arrayOfRegularPrices.push(row.mrp);
                    arrayOfSalePrices.push(row.purchaseprice);
                    arrayOfBrandNames.push(row.brandname);
                });
                res.render('AllProducts', {
                    arrayOfProductIds: arrayOfProductIds,
                    arrayOfImageAddresses: arrayOfImageAddresses,
                    arrayOfRegularPrices: arrayOfRegularPrices,
                    arrayOfSalePrices: arrayOfSalePrices,
                    arrayOfBrandNames: arrayOfBrandNames,
                }, (err, html) => {
                    if (err) {
                        console.debug(err);
                        res.status(501).redirect('../');
                    }
                    res.send(html);
                });
            }
        }, () => {
            res.status(301).redirect('login');
        });
    }
    getNewProductPage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            res.render('NewProduct', {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    async createNewProduct(req, res) {
        const { name, brand_name, brand_code, strength, qty, packing, manufacturer, marketedby, batch_number, hsn_code, mfg_date, exp_date, product_mrp, product_purchase_price, product_rate, product_sgst, product_cgst, product_cost_var, product_sku, } = req.body;
        console.log(req.body);
        const theDrugObject = this.mg.createDrugObject(name, brand_name, brand_code, strength, qty, packing, manufacturer, marketedby, batch_number, hsn_code, mfg_date, exp_date, product_mrp, product_purchase_price, product_rate, product_sgst, product_cgst, product_cost_var, product_sku, theFileName, req.session.adminEmail);
        console.log('To Database Service');
        const returnedObject = await this.db.addDrug(theDrugObject);
        if (returnedObject.error)
            console.log(returnedObject.error);
        res.redirect('products');
    }
    getAllArticles(req, res) {
        this.se.adminSessionExecutor(req, res, async () => {
            const theDBReturnObject = await this.db.retrieve(database_service_1.EntryType.ARTICLE, `where admin = '${req.session.adminEmail}'`);
            if (theDBReturnObject.error) {
                console.debug('Internal Error Here');
                res.status(501).redirect('../');
            }
            else {
                const artThumbnailArray = [];
                const artNameArray = [];
                const artPublisherArray = [];
                const artDopArray = [];
                theDBReturnObject.resultObject.forEach(row => {
                    artThumbnailArray.push(row.thumbnail);
                    artNameArray.push(row.name);
                    artPublisherArray.push(row.publisher);
                    artDopArray.push(row.dop);
                });
                res.render('AllArticles', {
                    artThumbnailArray: artThumbnailArray,
                    artNameArray: artNameArray,
                    artPublisherArray: artPublisherArray,
                    artDopArray: artDopArray,
                });
            }
        }, () => {
            res.status(301).redirect('login');
        });
    }
    getNewArticlePage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            res.render('NewArticle', {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    createNewArticle(req, res) {
        this.se.adminSessionExecutor(req, res, async () => {
            const { article_name, article_publisher_name, article_about, article_article, } = req.body;
            const theArticleObject = this.mg.createArticleObject(article_name, article_publisher_name, article_about, req.session.adminEmail, theFileName, theOtherImagesArray.toString());
            const theDatabaseReturnObject = await this.db.addArticle(theArticleObject);
            if (theDatabaseReturnObject.error) {
                console.debug(theDatabaseReturnObject.error);
                res.status(501).redirect('../');
            }
            else {
                fs.writeFile(`Articles/${theArticleObject.id}.md`, article_article, err => {
                    if (err)
                        console.debug(`Error Occured While Writing File: ${err}`);
                    else
                        console.debug(`The File Has Been Written. with details
                      ${article_article}`);
                    res.redirect('./articles');
                });
            }
        }, () => {
            res.redirect('login');
        });
        theOtherImagesArray = [];
    }
    async getAllModule(req, res) {
        const allModules = await this.ms.getAllModules();
        this.se.adminSessionExecutor(req, res, () => {
            if (!allModules) {
                res.render('404', {});
                return;
            }
            res.render('AllModules', { allModules });
        }, () => {
            res.status(301).redirect('login');
        });
    }
    getNewModulePage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            res.render('NewModule', {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    createNewModule(req, res) {
        this.se.adminSessionExecutor(req, res, async () => {
            const { module_name, module_desc, module_price, module_type, module_article_title, module_article, } = req.body;
            const theModuleObject = this.mg.createModuleObject(module_name, module_desc, module_price, module_type, theModuleThumbnail, theModuleVideo, module_article_title, module_article, req.session.adminEmail);
            const theDBReturnObject = await this.db.addModule(theModuleObject);
            if (theDBReturnObject.error)
                console.log(theDBReturnObject.error);
            res.redirect('modules');
        }, () => {
            res.status(501).redirect('../');
        });
    }
    getAllSessions(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            res.render('AllSessions', {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    getUpdateProductPage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            const pID = req.params.id;
            res.render(`UpdateProduct/: ${pID}`, {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    updateNewProduct(req, res) {
        throw 'expects further implementation';
    }
    getUpdateArticlePage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            const aID = req.params.id;
            res.render(`UpdateArticle/: ${aID}`, {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    updateNewArticle(req, res) {
        throw 'expects further implementation';
    }
    getUpdateModulePage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            const mID = req.params.id;
            res.render(`UpdateModule/: ${mID}`, {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    updateNewModule(req, res) {
        throw 'expects further implementation';
    }
    deleteItem(req, res) {
    }
};
__decorate([
    common_1.Get('login'),
    common_1.Render('AdminLogin.ejs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminLogin", null);
__decorate([
    common_1.Post('adminLoginAction'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminLoginAction", null);
__decorate([
    common_1.Get('products'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getProducts", null);
__decorate([
    common_1.Get('createNewProduct'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getNewProductPage", null);
__decorate([
    common_1.Post('newProduct'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('product_thumbnail', 1, multerOptions)),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createNewProduct", null);
__decorate([
    common_1.Get('articles'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAllArticles", null);
__decorate([
    common_1.Get('createNewArticle'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getNewArticlePage", null);
__decorate([
    common_1.Post('newArticle'),
    common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([
        { name: 'article_thumbnail', maxCount: 1 },
        { name: 'article_otherimages[]', maxCount: 3 },
    ], multerOptions)),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "createNewArticle", null);
__decorate([
    common_1.Get('modules'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllModule", null);
__decorate([
    common_1.Get('createNewModule'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getNewModulePage", null);
__decorate([
    common_1.Post('newModule'),
    common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([
        { name: 'moduleThumbnail', maxCount: 1 },
        { name: 'moduleVideo', maxCount: 1 },
    ], multerOptions)),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "createNewModule", null);
__decorate([
    common_1.Get('sessions'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAllSessions", null);
__decorate([
    common_1.Get('updateProduct/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getUpdateProductPage", null);
__decorate([
    common_1.Post('updateProduct'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateNewProduct", null);
__decorate([
    common_1.Get('updateArticle/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getUpdateArticlePage", null);
__decorate([
    common_1.Post('updateArticle'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateNewArticle", null);
__decorate([
    common_1.Get('updateModule/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getUpdateModulePage", null);
__decorate([
    common_1.Post('updateModule'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateNewModule", null);
__decorate([
    common_1.Get('delete/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteItem", null);
AdminController = __decorate([
    common_1.Controller('admin'),
    __metadata("design:paramtypes", [session_executor_service_1.SessionExecutorService,
        model_service_1.ModelService,
        database_service_1.DatabaseService,
        module_service_1.ModuleService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map