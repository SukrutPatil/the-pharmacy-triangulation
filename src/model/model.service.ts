import { Injectable } from '@nestjs/common';
import * as crypticKeyGenerator from 'crypto-random-string'
/**
 *Module Types
 *
 * @export
 * @enum {number}
 */
export enum ModuleType {
    DIET,
    CAREER,
    ENTREPRENEURSHIP,
    MEDICATION
}
/**
 *For Generating Random Keys
 *
 * @enum {number}
 */
enum RandomIdType {
    TRANSACTION,
    PRODUCT,
    VIDEO
}
/**
 *
 *
 * @interface Member
 */
interface Member  {
name: string,
email:string,
phone:any,
password:string,
membershipType:Array<string>
isAdmin?:string
//Possible Values for isAdmin are `YES` and `NO`
}
/**
 *
 *
 * @interface Transaction
 */
interface Transaction {
    transactionId:string,
    buyerName:string,
    address:string,
    phone:number,
    email:string,
    product_id:string
}
/**
 *
 *
 * @interface Product
 */
interface Product {
    product_id:string,
    product_main_image_src:string
    name:string,
    price:number,
    info:string,
    itemsInStock:number
} 
/**
 *
 *
 * @interface Video
 */
interface Video {
    video_id:string,
    video_title:string,
    video_src:string,
    video_info:string,
    video_module:ModuleType,
    video_json_src:string
}

/**
 *
 *
 * @export
 * @class ModelService
 */
@Injectable()

export class ModelService {
    /**
     *GENERATES MEMBER OBJECT
     *
     * @memberof ModelService
     */
    public createMemberObject = (name:string,email:string,phone:number,password:string,membershipType:Array<string>,isAdmin?:string):Member=>{
       isAdmin = (isAdmin)?'YES':'NO'                           // For Database Integrity (Not Required Though)
        return {
            name,email,phone,password,membershipType,isAdmin
        }
    }
    /**
     *GENERATES PRODUCT OBJECT
     *
     * @memberof ModelService
     */
    public createProductObject = (name:string,price:number,info:string,product_main_image_src:string,itemsInStock:number):Product =>{
       const product_id = this.generateUniqueID(RandomIdType.PRODUCT)
       return {product_id,product_main_image_src,name,price,info,itemsInStock}
    }
    /**
     *GENERATES TRANSACTION OBJECT
     *
     * @memberof ModelService
     */
    public createTransactionObject = (buyerName:string,address:string,phone:number,email:string,product_id:string):Transaction=>{
        const transactionId = this.generateUniqueID(RandomIdType.TRANSACTION)
        return {transactionId,address,buyerName,email,phone,product_id};
    }
    /**
     *GENERATES VIDEO OBJECT
     *
     * @memberof ModelService
     */
    public createVideoObject = (video_title:string,video_src:string,video_info:string,video_module:ModuleType,video_json_src:string):Video =>{
        const video_id = this.generateUniqueID(RandomIdType.VIDEO)
        return {video_id,video_info,video_json_src,video_module,video_src,video_title};
    }
   /**
    *Generates Unique IDs based on Enum
    *
    * @private
    * @memberof ModelService
    */
   private generateUniqueID = (rt:RandomIdType):string =>{
        let prefix:string
        switch(rt) {
            case RandomIdType.PRODUCT:
                prefix = `PRO`
                break;
            case RandomIdType.VIDEO:
                prefix = `VID`
                break;
            case RandomIdType.TRANSACTION:
                prefix = `TRS`
                    break;
        }
       const suffix:string = crypticKeyGenerator({length:7})+Date.now().toString()
        return `${prefix}${suffix}`
    }
}
