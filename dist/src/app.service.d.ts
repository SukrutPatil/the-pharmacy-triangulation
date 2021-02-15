import { DatabaseService } from './database/database.service';
export declare class AppService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    getRandomArrayOfModules(): Promise<any[]>;
    private shuffle;
}
