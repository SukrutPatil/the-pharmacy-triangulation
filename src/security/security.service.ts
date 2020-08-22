import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
@Injectable()
export class SecurityService {
    public secureData =(key:string,value:string):string =>{
        const cipher = crypto.createCipher('aes128',key)
        const encrypted = cipher.update(value,'utf8','hex')+cipher.final('hex')
        return encrypted
    }
    public retrieveData = (key:string,value:string):string => {
        const decipher = crypto.createDecipher('aes128',key)
        const decrypted = decipher.update(value,'hex','utf8') + decipher.final('utf8')
        return decrypted
    }

}
