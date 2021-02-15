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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
require('dotenv').config();
const Razorpay = require("razorpay");
const products_service_1 = require("../products/products.service");
const crypticKeyGenerator = require("crypto-random-string");
let PaymentService = class PaymentService {
    constructor(productsService) {
        this.productsService = productsService;
        this.rzp = new Razorpay({
            key_id: process.env.key_id,
            key_secret: process.env.key_secret,
        });
    }
    async generateOrderIdForProduct(product_id, amt) {
        let theOrder;
        await this.rzp.orders.create({
            amount: amt,
            currency: 'INR',
            receipt: this.generateRecieptId(product_id),
        }, (err, order) => {
            if (err)
                console.error(err);
            theOrder = order;
        });
        return theOrder.id;
    }
    async getCheckoutOptionsForProduct(product_id) {
        const theProductDetails = await this.productsService.getParticularProduct(product_id);
        const theProductPrice = this.getProductPrice(theProductDetails.mrp);
        const theOrderId = this.generateOrderIdForProduct(product_id, theProductPrice);
        const options = {
            key: process.env.key_id,
            amount: theProductPrice,
            currency: 'INR',
            name: 'At My Care ',
            description: `Item Bought: ${theProductDetails.brandname}`,
            order: theOrderId,
            callback_url: './api/checkoutdone',
            notes: {
                address: 'MM University',
            },
            theme: {
                color: '#054a29',
            },
        };
        return options;
    }
    getProductPrice(mrp) {
        return mrp * 100;
    }
    generateRecieptId(product_id) {
        return `${crypticKeyGenerator({ length: 7 })}${product_id}`;
    }
};
PaymentService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map