import { Injectable } from '@nestjs/common';
import { DatabaseService, EntryType } from '../database/database.service';
export enum ModuleCategory {
    MED = "Medication Counseling",
    DIET = "Diet Counseling",
    CAREER = "Career Counseling",
    ENTREPRENEURSHIP = "Entrepreneurship Counseling"
}
@Injectable()
export class ModuleService {
    static callTimes = 0;
    constructor(private readonly db: DatabaseService) { 
        console.debug(`ModuleService ${ModuleService.callTimes++}`);
    }
   async  getAllModules() {
       const dbReturnObject = await this.db.retrieve(EntryType.MODULE);
       if (dbReturnObject.error) {
           console.error(dbReturnObject.error);
           return null;
       }
       const allRows = dbReturnObject.resultObject;
       return allRows;
   }
    async getModulesByCategory(cat:ModuleCategory) {
        const allModules:Array<any> = await this.getAllModules();
   
        if (!allModules.length) return null;

        const filteredModules = allModules.filter((module) => module.category === cat);
        console.log(filteredModules);
        return filteredModules;
    }
    async getModuleById(id: string): Promise<any> {
        const allModules:Array<any> = await this.getAllModules();
   
        if (!allModules.length) return null;

        const filteredModule = allModules.find((module) => module.id === id);
        
        return filteredModule;
    }
    async getModuleAuthorName(id: string): Promise<string> {
        const {adminemail} = await this.getModuleById(id);
        const members =  (await this.db.retrieve(EntryType.MEMBER)).resultObject;
        const theAuthorName = members.find(m => m.email === adminemail).name;
        return theAuthorName;
    }
}
