import { Injectable } from '@nestjs/common';
import * as crypticKeyGenerator from 'crypto-random-string';
import { SecurityService } from '../security/security.service';
const dateFetch = () => {
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
export interface RzpProdUnit {
  rzptrid:string,
  user:string,
  addressid:string,
  time:string,
  prodid:string
}
export interface Drug {
  name: string;
  id: any;
  brandName: any;
  brandCode: any;
  strnth: any;
  qty: any;
  packing: any;
  sku: any;
  manufacturer: any;
  marketedby: any;
  batchno: any;
  hsncode: any;
  mfgdate: any;
  expdate: any;
  mrp: any;
  purchaseprice: any;
  rate: any;
  sgst: any;
  cgst: any;
  costvar: any;
  imgaddress: string;
  adminemail: string;
}
export interface Address {
  id: string;
  al1: string;
  al2?: string;
  al3: string;
  pincode: string;
}
/**
 *
 *
 * @interface Member
 */
export interface Member {
  name: string;
  email: string;
  phone: any;
  password: string;
  membershipType: Array<string>;
  isAdmin?: string;
  //Possible Values for isAdmin are `YES` and `NO`
}
/**
 *
 *
 * @interface Transaction
 */
export interface Transaction {
  transactionId: string;
  buyerName: string;
  address: string;
  phone: number;
  email: string;
  product_id: string;
}
export interface Article {
  id: string;
  name: string;
  publisher: string;
  about: string;
  admin: string;
  thumbnail: string;
  otherimages: string;
  dop: string;
}
export interface Module {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  thumbnail: string;
  video: string;
  articletitle: string;
  article: string;
  adminEmail: string;
  dop: string;
}
export interface User {
  userid: string;
  username: string;
  password: string;
  memtype: string[];
  phoneno: number;
  email: string;
}
export interface Chat {
  moduleid: string;
  sender: string;
  chatid: string;
  chat: string;
}

/**
 *
 *
 * @export
 * @class ModelService
 */
@Injectable()
export class ModelService {
  constructor(private securityService: SecurityService) {
    console.log('ModelService Class Initialized');
  }

  public createAddressObject = (
    al1: string,
    al2: string,
    al3: string,
    pincode: string,
  ):Address => {
    al2 = al2 ? al2 : ' ';
    return { id: this.generateUniqueID(RandomIdType.ADDRESS),al1,al2,al3,pincode };
  };
  /**
   * GENERATES ARTICLE OBJECT
   */
  public createArticleObject = (
    name: string,
    publisher: string,
    about: string,
    admin: string,
    thumbnail: string,
    otherimages: string,
  ): Article => {
    const id = this.generateUniqueID(RandomIdType.ARTICLE);
    const dop = dateFetch();
    return { id, about, admin, name, otherimages, publisher, thumbnail, dop };
  };
  public createUserObject = (
    username: string,
    email: string,
    password: string,
    memtype: string,
    phoneno: number,
  ) => {
    return { username, email, password, memtype: memtype.split(','), phoneno };
  };
  /**
   *GENERATES MEMBER OBJECT
   *
   * @memberof ModelService
   */
  public createMemberObject = (
    name: string,
    email: string,
    phone: number,
    pwd: string,
    membershipType: Array<string>,
    isAdmin?: string,
  ): Member => {
    isAdmin = isAdmin ? 'YES' : 'NO'; // For Database Integrity (Not Required Though)
    const password = this.securityService.secureData(`${name}${email}`, pwd);
    return {
      name,
      email,
      phone,
      password,
      membershipType,
      isAdmin,
    };
  };
  public createChatObject = (
    moduleid: string,
    sender: string,
    chat: string,
  ) => {
    return {
      chatid: this.generateUniqueID(RandomIdType.CHAT),
      moduleid,
      sender,
      chat,
    };
  };
  public createDrugObject = (
    name: string,
    brand_name: string,
    brand_code: string,
    strength: string,
    qty: string,
    packing: string,
    manufacturer: string,
    marketedby: string,
    batch_number: string,
    hsn_code: string,
    mfg_date: string,
    exp_date: string,
    product_mrp: string,
    product_purchase_price: string,
    product_rate: string,
    product_sgst: string,
    product_cgst: string,
    product_cost_var: string,
    product_sku: string,
    imgaddress: string,
    adminemail: string,
  ): Drug => {
    const id = this.generateUniqueID(RandomIdType.PRODUCT);
    return {
      id: id,
      name: name,
      brandName: brand_name,
      batchno: batch_number,
      brandCode: brand_code,
      cgst: product_cgst,
      costvar: product_cost_var,
      expdate: exp_date,
      hsncode: hsn_code,
      manufacturer: manufacturer,
      marketedby: marketedby,
      mfgdate: mfg_date,
      mrp: product_mrp,
      packing: packing,
      purchaseprice: product_purchase_price,
      qty: qty,
      rate: product_rate,
      sgst: product_sgst,
      sku: product_sku,
      strnth: strength,
      imgaddress: imgaddress,
      adminemail: adminemail,
    };
  };
  public createModuleObject = (
    name: string,
    description: string,
    price: string,
    category: string,
    thumbnail: string,
    video: string,
    articletitle: string,
    article: string,
    adminEmail: string,
  ): Module => {
    const id = this.generateUniqueID(RandomIdType.MODULE);
    const dop = dateFetch();
    return {
      id,
      adminEmail,
      article,
      articletitle,
      category,
      description,
      dop,
      name,
      price,
      thumbnail,
      video,
    };
  };
  /**
   *GENERATES TRANSACTION OBJECT
   *
   * @memberof ModelService
   */
  public createTransactionObject = (
    buyerName: string,
    address: string,
    phone: number,
    email: string,
    product_id: string,
  ): Transaction => {
    const transactionId = this.generateUniqueID(RandomIdType.TRANSACTION);
    return { transactionId, address, buyerName, email, phone, product_id };
  };

  /**
   *Generates Unique IDs based on Enum
   *
   * @private
   * @memberof ModelService
   */
  private generateUniqueID = (rt: RandomIdType): string => {
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
