import { Category } from "./Category";
import { Product } from "./Product";

export type Props = {
  isModalOpen: boolean;
  isModalLoading: boolean;
  newProduct: Product;
  categories: Category[];
  isLoading: boolean;
  handleInputChange: (field: string, value: any) => void;
  handleOk: () => void;
  handleCancel: () => void;
  validateRequiredInputs: (value: any) => "success" | "error" | "validating";
  selectedProduct: Product | null;
};
