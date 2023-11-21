import { ProductToCreate } from '../interfaces/product.interface';

export class CreateProduct implements ProductToCreate {
  name: string;
  description: string;
  price: number;
  qtd: number;
}
