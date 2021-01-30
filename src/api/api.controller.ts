import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiService } from './api.service';
import { Request } from 'express';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}
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

}
