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
      res.render('404', {
        errorMessage: 'This Product is No Longer Available!',
      });
      return;
    }
    // Fetch Product  Information
    return { product };
  }
  @Get('getProductInfo/:id')
  async getProductInfo(@Param('id') id: string) {
    const product = await this.productsService.getParticularProduct(id);
    // if (!product) {
    //   res.render('404', {
    //     errorMessage: 'This Product is No Longer Available!',
    //   });
    //   return;
    // }
    // console.log(product);
    // Fetch Product  Information
    console.log('Recieved');
    return { product };
  }
}
