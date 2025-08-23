export type StockMovement = {
  id?: number;
  productId: number;
  clientId?: number;
  userId?: number;
  type: "in" | "out";
  quantity: number;
  date?: string;
  Product?: { name: string };
};
