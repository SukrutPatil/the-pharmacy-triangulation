import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get(':id')
  @Render('ViewProduct.ejs')
  async getProductById(@Res() res: Response, @Param('id') id: string) {
    console.log(id);
    const product = await this.productsService.getParticularProduct(id);
    if (!product) {
      res.render('404', {});
      return;
    }
    // Fetch Product  Information
    return { product };
  }
}
