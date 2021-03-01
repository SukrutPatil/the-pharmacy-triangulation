import { DatabaseService } from '../database/database.service';
export declare enum ModuleCategory {
    MED = "Medication Counseling",
    DIET = "Diet Counseling",
    CAREER = "Career Counseling",
    ENTREPRENEURSHIP = "Entrepreneurship Counseling"
}
export declare class ModuleService {
    private readonly db;
    static callTimes: number;
    constructor(db: DatabaseService);
    getAllModules(): Promise<any>;
    getModulesByCategory(cat: ModuleCategory): Promise<any[]>;
    getModuleById(id: string): Promise<any>;
    getModuleAuthorName(id: string): Promise<string>;
}
