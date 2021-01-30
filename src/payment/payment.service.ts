import { Injectable } from '@nestjs/common';
import * as Razorpay from 'razorpay';
@Injectable()
export class PaymentService {
  options = new Razorpay({
    key_id: 'rzp_test_jFuNiQDkBN9iJ1',
    key_secret: 'BzZUD085gu0oGeuFJCE77AZZ',
  });
    async createPayment(order_id:string, paymentType:PaymentType) {
        
    }
    
}
export interface Order {
    order_id: string;
    reciept_id: string;
    order_object: Object;
}
export enum PaymentType {
    PRODUCT,
    MODULE_USER,
    MODULE_MEMBER,
    SESSION_MEMBER,
    SESSION_USER,
    MEMBERSHIP_DIET,
    MEMBERSHIP_CAREER,
    MEMBERSHIP_ENTREPRENEUR,
    MEMBERSHIP_MEDICATION
}
