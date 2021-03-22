export declare class SecurityService {
    static callTimes: number;
    constructor();
    secureData: (key: string, value: string) => any;
    retrieveData: (key: string, value: string) => any;
}
