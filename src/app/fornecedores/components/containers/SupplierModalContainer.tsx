"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import SupplierModal from "../presentations/SupplierModal";
import { Supplier } from "@/types/Supplier";
import { ValidityMessage } from "@/types/ValidityMessage";
import { ValidityMessageValidation } from "@/app/lib/createValidityMessage";
import { MessageInstance } from "antd/es/message/interface";
import { ModalMode } from "@/types/ModalMode";
import { supplierSchema } from "@/app/validations";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  messageApi: MessageInstance;
  suppliersSetter: Dispatch<SetStateAction<Supplier[]>>;
  modalMode: ModalMode;
  selectedSupplier: Supplier | null;
  onUpdateFinish?: () => void;
}

const initialSupplierState: Supplier = {
  name: "",
  cpfCnpj: "",
  corporateName: "",
  city: "",
  mainContactName: "",
  mainContactPhone: "",
  mainContactEmail: "",
  supplierInfo: {
    paymentTerms: "",
  },
};

export default function SupplierModalContainer({
  isOpen,
  onClose,
  messageApi,
  suppliersSetter,
  modalMode,
  selectedSupplier,
  onUpdateFinish,
}: Props) {
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [supplier, setSupplier] = useState<Supplier>(initialSupplierState);

  useEffect(() => {
    if ((modalMode === ModalMode.EDIT || modalMode === ModalMode.VIEW) && selectedSupplier) {
      setSupplier(selectedSupplier);
    }
  }, [modalMode, selectedSupplier]);
  
  const handleInputChange = (field: string, value: any) => {
    if (field === "supplierInfo") {
      setSupplier((prev) => ({ ...prev, supplierInfo: value }));
    } else {
      setSupplier((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateRequiredInputs = (value: unknown) => {
    if (value === undefined || value === "" || value === null) return "error";
    return "success";
  };

  const handleOk = () => {
    validateSupplier();
    setIsModalLoading(true);
    if (modalMode === ModalMode.CREATE) {
      createSupplier();
    } else {
      updateSupplier();
    }
  };

  const validateSupplier = () => {
    const parseResult = supplierSchema.safeParse(supplier);
    if (!parseResult.success) {
      parseResult.error.issues.forEach((error) => {
        messageApi.error(error.message);
      });
      return;
    }
  };

  const handleCancel = () => {
    setSupplier(initialSupplierState);
    onClose();
  };

  const createSupplier = async () => {
    try {
      const response = await fetch("/fornecedores/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplier),
      });
      if (!response.ok) {
        const errorData: ValidityMessage = {
          type: "error",
          content: "Erro ao criar fornecedor.",
          className: "mt-8",
        };
        ValidityMessageValidation(errorData, messageApi);
        setIsModalLoading(false);
        return;
      }
      const responseData = await response.json();
      suppliersSetter((prev) => [...prev, responseData.supplier]);
      const successData: ValidityMessage = {
        type: "success",
        content: "Fornecedor criado com sucesso.",
        className: "mt-8",
      };
      ValidityMessageValidation(successData, messageApi);
      onUpdateFinish?.();
      onClose();
    } catch (error) {
      console.error("Erro ao criar fornecedor:", error);
      const errorData: ValidityMessage = {
        type: "error",
        content: "Erro ao criar fornecedor.",
        className: "mt-8",
      };
      ValidityMessageValidation(errorData, messageApi);
    } finally {
      setSupplier(initialSupplierState);
      setIsModalLoading(false);
    }
  };

  const updateSupplier = async () => {
    try {
      const response = await fetch("/fornecedores/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
      });

      if (!response.ok) {
        const errorData: ValidityMessage = {
          type: "error",
          content: "Erro ao atualizar fornecedor.",
          className: "mt-8",
        };
        ValidityMessageValidation(errorData, messageApi);
        setIsModalLoading(false);
        return;
      }
      await response.json();
      const successData: ValidityMessage = {
        type: "success",
        content: "Fornecedor atualizado com sucesso.",
        className: "mt-8",
      };
      ValidityMessageValidation(successData, messageApi);
      onUpdateFinish?.();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      const errorData: ValidityMessage = {
        type: "error",
        content: "Erro ao atualizar fornecedor.",
        className: "mt-8",
      };
      ValidityMessageValidation(errorData, messageApi);
    } finally {
      setSupplier(initialSupplierState);
      setIsModalLoading(false);
    }
  };

  return (
    <SupplierModal
      isModalOpen={isOpen}
      isModalLoading={isModalLoading}
      supplier={supplier}
      handleInputChange={handleInputChange}
      handleOk={handleOk}
      handleCancel={handleCancel}
      validateRequiredInputs={validateRequiredInputs}
      modalMode={modalMode}
      selectedSupplier={selectedSupplier}
    />
  );
}
