import { Product } from "./Product";
import { StockMovement } from "./StockMovement";

export type StockMovementModalProps = {
  isModalOpen: boolean;
  isModalLoading: boolean;
  movement: StockMovement;
  products: Product[];
  isLoadingProducts: boolean;
  handleInputChange: (field: string, value: unknown) => void;
  handleOk: () => void;
  handleCancel: () => void;
  validateRequiredInputs: (value: unknown) => "success" | "error" | "validating";
  modalMode: import("./ModalMode").ModalMode;
  selectedMovement: StockMovement | null;
};
