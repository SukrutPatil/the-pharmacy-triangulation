import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}
  @Get('fetchChat/:modId')
  async fetchCurrentChat(@Param('modId') moduleId: string) {
    const chats = await this.apiService.getChats(moduleId);
    return { chats };
  }
}
