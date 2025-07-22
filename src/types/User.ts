import { UserRole } from "./UserRole";
import { StockMovement } from "./StockMovement";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  image?: string | null;
  role: number;
  createdAt: Date;
  updatedAt: Date;

  Role: UserRole;
  StockMovement: StockMovement[];
};
