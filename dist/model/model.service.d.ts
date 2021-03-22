export declare const dateFetch: () => any;
export declare enum ModuleType {
    DIET = 0,
    CAREER = 1,
    ENTREPRENEURSHIP = 2,
    MEDICATION = 3
}
declare enum RandomIdType {
    TRANSACTION = 0,
    PRODUCT = 1,
    MODULE = 2,
    ARTICLE = 3,
    SESSION = 4,
    CHAT = 5,
    ADDRESS = 6
}
export declare class ModelService {
    generateUniqueID: (rt: RandomIdType) => string;
}
export {};
