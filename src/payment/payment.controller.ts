import { Controller, Get, Param, Req, Res, Session } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService, PaymentType } from './payment.service';

@Controller('buy')
export class PaymentController {
    @Get(':id') 
    initiatePayment(@Req() req:Request ,@Param('id') id: string, @Res() res: Response) {
        
     }
    private getPaymentType(id: string, req: Request): PaymentType {
        const { session } = req;

        switch (id.substring(0, 3)) {
            case 'PRO':
                return PaymentType.PRODUCT;

    }
    }


}
