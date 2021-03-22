import { Injectable } from '@nestjs/common';
import * as crypticKeyGenerator from 'crypto-random-string';
export const dateFetch = () => {
  let today: any = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
};
/**
 * Module Types
 * @export
 * @enum {number}
 */
export enum ModuleType {
  DIET,
  CAREER,
  ENTREPRENEURSHIP,
  MEDICATION,
}
/**
 *For Generating Random Keys
 *
 * @enum {number}
 */
enum RandomIdType {
  TRANSACTION,
  PRODUCT,
  MODULE,
  ARTICLE,
  SESSION,
  CHAT,
  ADDRESS,
}



@Injectable()
export class ModelService {

  public generateUniqueID = (rt: RandomIdType): string => {
    let prefix: string;
    switch (rt) {
      case RandomIdType.PRODUCT:
        prefix = `PRO`;
        break;
      case RandomIdType.MODULE:
        prefix = `MOD`;
        break;
      case RandomIdType.TRANSACTION:
        prefix = `TRS`;
        break;
      case RandomIdType.ARTICLE:
        prefix = `ART`;
        break;
      case RandomIdType.SESSION:
        prefix = 'SESS';
        break;
      case RandomIdType.CHAT:
        prefix = 'CHAT';
        break;
      case RandomIdType.ADDRESS:
        prefix = 'ADDR';
        break;
    }

    const suffix: string =
      crypticKeyGenerator({ length: 7 }) + Date.now().toString();
    return `${prefix}${suffix}`;
  };
}
