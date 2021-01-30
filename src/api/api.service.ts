import { Injectable } from '@nestjs/common';
import { DatabaseService, EntryType } from 'src/database/database.service';

@Injectable()
export class ApiService {
    constructor(private db:DatabaseService) {}
    async getChats(moduleId: string) {
        const { error, resultObject } = await this.db.retrieve(EntryType.CHAT,`where moduleid = '${moduleId}'`);
        if (error) return null;
        return resultObject.rows;
    }
}
