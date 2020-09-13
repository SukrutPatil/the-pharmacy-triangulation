import { Controller, Get } from '@nestjs/common';
import { productService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly ProductService: productService){}

    @Get()
    getProduct(){
        return this.ProductService.getProductService();
    }

}
