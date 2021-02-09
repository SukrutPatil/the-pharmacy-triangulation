import { Injectable } from '@nestjs/common';
import { DatabaseService, EntryType } from 'src/database/database.service';
import {ModuleType, Chat, ModelService } from '../model/model.service';
import * as Razorpay from 'razorpay';

@Injectable()
export class ApiService {
  constructor(private db: DatabaseService, private ms: ModelService) {}
  async getChats(moduleId: string) {
    const { error, resultObject } = await this.db.retrieve(
      EntryType.CHAT,
      `where moduleid = '${moduleId}'`,
    );
    if (error) return null;
    return resultObject.rows;
  }
  async updateChat(
    moduleId: string,
    chatter: string,
    chat: string,
  ): Promise<boolean> {
    const chatObject = this.ms.createChatObject(moduleId, chatter, chat);
    const { error } = await this.db.addChat(chatObject);
    if (error) return false;
    return true;
  }
  async newMember({name,email,phone,password,type}) {

  }

}
