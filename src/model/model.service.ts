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
}
export interface Drug {
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
  desc: string;
  price: string;
  category: string;
  thumbnail: string;
  video: string;
  articletitle: string;
  article: string;
  adminEmail: string;
  dop: string;
}

/**
 *
 *
 * @export
 * @class ModelService
 */
@Injectable()
export class ModelService {
  constructor(private securityService: SecurityService) {}
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
  public createDrugObject = (
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
    desc: string,
    price: string,
    category: string,
    thumbnail: string,
    video: string,
    articletitle: string,
    article: string,
    adminEmail: string,
    dop: string,
  ):Module => {
    const id = this.generateUniqueID(RandomIdType.MODULE);
    return {id,adminEmail,article,articletitle,category,desc,dop,name,price,thumbnail,video};
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
    }
    const suffix: string =
      crypticKeyGenerator({ length: 7 }) + Date.now().toString();
    return `${prefix}${suffix}`;
  };
}
