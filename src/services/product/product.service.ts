import { Injectable, Get } from "@nestjs/common";

@Injectable()
export class productService{
    getProductService(){
        return 'Product Shoppin page';
    }
}