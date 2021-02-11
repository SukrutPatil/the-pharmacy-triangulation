import { Injectable } from '@nestjs/common';
require('dotenv').config();
import * as Razorpay from 'razorpay';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class PaymentService {
  rzp = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  constructor(private readonly productsService: ProductsService) {
    this.rzp.orders.create(
      {
        amount: 50000, // amount in the smallest currency unit
        currency: 'INR',
        receipt: 'order_rcptid_11',
      },
      (err, order) => {
        console.log(order);
        console.log(process.env.key_id);
      },
    );
  }
  async generateOrderIdForProduct(product_id: string, amt) {
    let theOrder;
    this.rzp.orders.create(
      {
        amount: amt,
        currency: 'INR',
        receipt: 'fvndfjkvb dfjkl',
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
      description: `Item Bought: ${theProductDetails.brandName}`,
      order: theOrderId,
      notes: {
        address: 'MM University',
      },
      theme: {
        color: '#3399cc',
      },
    };
    return options;
  }
  private getProductPrice(mrp) {
    return mrp * 100;
  }
}
