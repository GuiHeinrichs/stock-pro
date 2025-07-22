export type StockMovement = {
  id?: number;
  productId: number;
  clientId: number;
  type: "in" | "out";
  quantity: number;
  date?: string;
  Product?: { name: string };
};
