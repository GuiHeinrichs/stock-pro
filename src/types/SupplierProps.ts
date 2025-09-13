import { Supplier } from "./Supplier";

export type SupplierModalProps = {
  isModalOpen: boolean;
  isModalLoading: boolean;
  supplier: Supplier;
  handleInputChange: (field: string, value: any) => void;
  handleOk: () => void;
  handleCancel: () => void;
  validateRequiredInputs: (value: unknown) => "error" | "success" | undefined;
  modalMode: import("./ModalMode").ModalMode;
  selectedSupplier: Supplier | null;
};
