import { Body, Controller, Get, Post } from '@nestjs/common';

import { Product } from './schemas/product.schema';
import { ProductService } from './product.service';
import { CreateProduct } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  insertOne(@Body() createProduct: CreateProduct): Promise<Product> {
    return this.productService.insertOne(createProduct);
  }

  @Get()
  findAll(): Promise<Array<Product>> {
    return this.productService.findAll();
  }
}
