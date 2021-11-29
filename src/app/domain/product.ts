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
  isLoved?: boolean;
}

export interface Notifications {
  id?: string;
  name?: string;
  description?: string;
  artist?: string;
}
export interface ProductsMapped {
  data: Product[];
}
