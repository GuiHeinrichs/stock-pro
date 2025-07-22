export type Product = {
  id?: number;
  name: string;
  sku: string;
  barcode: string;
  description?: string | null;
  price: number;
  sellingPrice: number;
  quantity: number;
  categoryId?: number | null;
  supplierId?: number | null;
  clientId: number;
  createdAt?: string;
  updatedAt?: string;
  Supplier?: { name: string };
  ProductDetail: ProductDetail;
};

export type ProductDetail = {
  brand?: string;
  model?: string;
  dimensions?: string;
  weight?: number;
  color?: string;
  material?: string;
  additionalInfo?: string;
};
