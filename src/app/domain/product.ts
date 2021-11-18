export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  year?: number;
  quantity?: number;
  inventoryStatus?: string;
  artist?: string;
  image?: string;
  rating?: number;
  isLoved?: string;
}
export interface ProductsMapped {
  data: Product[];
}
