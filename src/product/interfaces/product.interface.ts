import { Types } from 'mongoose';

export default interface Product {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  qtd: number;
}

export type ProductToCreate = Omit<Product, '_id'>;
