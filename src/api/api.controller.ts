import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiService } from './api.service';
import { Request } from 'express';
import { PaymentService } from 'src/payment/payment.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService,private readonly paymentService:PaymentService) {}
  @Get('fetchChat/:modId')
  async fetchCurrentChat(@Param('modId') moduleId: string) {
    const chats = await this.apiService.getChats(moduleId);
    return { chats };
  }
    @Post('updateChat')
    async updateChat(@Body() body: any, @Req() req: Request) {
        console.log(body);
        const { chat,theModuleId } = body;
        const chatter = req.session.loggedInUser;
        const done = await this.apiService.updateChat(theModuleId, chatter, chat);
        console.log(done);
        return { done };
    }
  @Post('becomeAMember')
  async newMember(@Body() body:any, @Req() req: Request) {
    const { name, email, phone, password, type } = body;
    console.log(name, email, phone, password,type);
  }
  @Get('getCheckoutForProduct/:id')
  async getCheckoutForProduct(@Param('id') product_id) {
  const checkoutOptions =   await this.paymentService.getCheckoutOptionsForProduct(product_id);
    return { checkoutOptions };
  }
}
