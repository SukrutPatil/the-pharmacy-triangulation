import { Injectable } from '@nestjs/common';
require('dotenv').config();
import * as Razorpay from 'razorpay';
import { ProductsService } from 'src/products/products.service';
import * as crypticKeyGenerator from 'crypto-random-string';
@Injectable()
export class PaymentService {
  static callTimes = 0;
  rzp = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  constructor(private readonly productsService: ProductsService) {
    console.debug(`PaymentService ${PaymentService.callTimes++}`);
  }
  async generateOrderIdForProduct(product_id: string, amt: number) {
    let theOrder;
    await this.rzp.orders.create(
      {
        amount: amt,
        currency: 'INR',
        receipt: this.generateRecieptId(product_id),
      },
      (err: string, order) => {
        if (err) console.error(err);

        theOrder = order;

      },
    );

    return theOrder.id;
  }
  async getCheckoutOptionsForProduct(product_id: string) {
    const theProductDetails = await this.productsService.getParticularProduct(
      product_id,
    );
    const theProductPrice = this.getProductPrice(theProductDetails.mrp);
    const theOrderId = this.generateOrderIdForProduct(
      product_id,
      theProductPrice,
    );
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
  private getProductPrice(mrp) {
    return mrp * 100;
  }
  private generateRecieptId(product_id: string) {
    return `${crypticKeyGenerator({ length: 7 })}${product_id}`;
  }
}
