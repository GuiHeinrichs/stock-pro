import { Product } from "./Product";
import { StockMovement } from "./StockMovement";

export type StockMovementModalProps = {
  isModalOpen: boolean;
  isModalLoading: boolean;
  movement: StockMovement;
  products: Product[];
  isLoadingProducts: boolean;
  handleInputChange: (field: string, value: any) => void;
  handleOk: () => void;
  handleCancel: () => void;
  validateRequiredInputs: (value: any) => "success" | "error" | "validating";
  modalMode: import("./ModalMode").ModalMode;
  selectedMovement: StockMovement | null;
};
