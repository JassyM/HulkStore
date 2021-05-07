import { Product } from './product.model';

export interface Purchase {
  id?: number;
  reference: string;
  purchaseDate: Date;
  updateDate: Date;
  initialUnits: number;
  currentUnits: number;
  product: Product;
  priceUnitary: number;
  totalCost: number;
}
