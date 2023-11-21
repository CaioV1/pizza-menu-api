import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './schemas/product.schema';
import { CreateProduct } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async insertOne(createProduct: CreateProduct): Promise<Product> {
    const createdProduct = new this.productModel(createProduct);
    return createdProduct.save();
  }

  findAll(): Promise<Array<Product>> {
    return this.productModel.find().exec();
  }
}
