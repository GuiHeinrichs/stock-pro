import { UserRole } from "./UserRole";
import { StockMovement } from "./StockMovement";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  clientId: number;
  image?: string | null;
  role: number;
  resetPassword: boolean;
  createdAt: Date;
  updatedAt: Date;

  Role: UserRole;
  StockMovement: StockMovement[];
};
