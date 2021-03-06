import { Injectable } from '@nestjs/common';
import { DatabaseService, EntryType } from 'src/database/database.service';
import { ModuleType, Chat, ModelService, Address, Drug } from '../model/model.service';
import * as Razorpay from 'razorpay';

@Injectable()
export class ApiService {
  /** Some Session Vars */
  static callTimes = 0;
  session_address: Address;
  session_product_id: string;
  constructor(private readonly db: DatabaseService, private readonly ms: ModelService) {
    console.debug(`ApiService ${ApiService.callTimes++}`);
  }
  async getChats(moduleId: string) {
    const { error, resultObject } = await this.db.retrieve(
      EntryType.CHAT,
      `where moduleid = '${moduleId}'`,
    );
    if (error) return null;
    return resultObject;
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
  async newMember({ name, email, phone, password, type }) {
    /**** To Be Implemented */


  }
  async saveAddress(al1:string, al2:string, al3:string, pincode:string): Promise<boolean> {
    const theAddressObject = this.ms.createAddressObject(
      al1,
      al2,
      al3,
      pincode,
    );
    this.session_address = { ...theAddressObject };
    const { error } = await this.db.addAddress(theAddressObject);
    console.log(error);

    return error ? false : true;
  }
}
