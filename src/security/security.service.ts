import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
@Injectable()
export class SecurityService {
    static callTimes = 0;
    constructor() {
        console.debug(`SecurityService ${SecurityService.callTimes++}`);
    }
    secureData = (key:string, value:string):any => {
        const cipher = crypto.createCipher('aes128', key);
        const encrypted = cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
        return encrypted;
    };
    retrieveData = (key:string, value:string):any => {
        const decipher = crypto.createDecipher('aes128', key);
        const decrypted = decipher.update(value, 'hex', 'utf8') + decipher.final('utf8');
        return decrypted;
    };
}
