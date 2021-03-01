import { Injectable } from '@nestjs/common';
import {DatabaseService, EntryType} from './database/database.service'
@Injectable()
export class AppService {
    constructor(private readonly dbService: DatabaseService) {}
    async getRandomArrayOfModules() {
    let modulesQueryReturn =   await this.dbService.retrieve(EntryType.MODULE)
    console.log(modulesQueryReturn);
        if (modulesQueryReturn.error) {
            console.log(modulesQueryReturn.error);
            return null;
        }
        if (modulesQueryReturn.resultObject.length == 0) {
           console.log('No Modules Available Yet!')
            return [];
        }
        //Shuffle Every Time
        return this.shuffle(modulesQueryReturn.resultObject);
        
    }
    private shuffle(arr: any[]) {
        return arr.sort(() => Math.random() - 0.5);
    }
}
