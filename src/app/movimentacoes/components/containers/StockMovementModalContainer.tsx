"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StockMovement } from "@/types/StockMovement";
import StockMovementModal from "../presentations/StockMovementModal";
import { ValidityMessage } from "@/types/ValidityMessage";
import { ValidityMessageValidation } from "@/app/lib/createValidityMessage";
import { MessageInstance } from "antd/es/message/interface";
import { ModalMode } from "@/types/ModalMode";
import { useProducts } from "@/app/hooks/products/useProducts";
import { useSession } from "next-auth/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  messageApi: MessageInstance;
  movementsSetter: Dispatch<SetStateAction<StockMovement[]>>;
  modalMode: ModalMode;
  selectedMovement: StockMovement | null;
  onUpdateFinish?: () => void;
}

const initialMovement: StockMovement = {
  productId: 0,
  type: "in",
  quantity: 1,
};

export default function StockMovementModalContainer({
  isOpen,
  onClose,
  messageApi,
  movementsSetter,
  modalMode,
  selectedMovement,
  onUpdateFinish,
}: Props) {
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [movement, setMovement] = useState<StockMovement>(initialMovement);
  const session = useSession();
  const { data: products = [], isLoading: isLoadingProducts } = useProducts();

  useEffect(() => {
    if ((modalMode === ModalMode.EDIT || modalMode === ModalMode.VIEW) && selectedMovement) {
      setMovement(selectedMovement);
    }
  }, [modalMode, selectedMovement]);

  const handleInputChange = (field: string, value: unknown) => {
    setMovement((prev) => ({ ...prev, [field]: value }));
  };

  const validateRequiredInputs = (value: unknown): "error" | "success" => {
    if (value === undefined || value === "" || value === null) return "error";
    return "success";
  };

  const handleOk = () => {
    setIsModalLoading(true);
    if (modalMode === ModalMode.CREATE) {
      createMovement();
    } else {
      updateMovement();
    }
  };

  const handleCancel = () => {
    setMovement(initialMovement);
    onClose();
  };

  const createMovement = async () => {
    const payload = {
      ...movement,
      clientId: session.data?.user.clientId,
      userId: Number(session.data?.user.id),
    };
    try {
      const response = await fetch("/estoque/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData: ValidityMessage = {
          type: "error",
          content: "Erro ao criar movimentação.",
          className: "mt-8",
        };
        ValidityMessageValidation(errorData, messageApi);
        setIsModalLoading(false);
        return;
      }
      const data = await response.json();
      movementsSetter((prev) => [...prev, data]);
      const successData: ValidityMessage = {
        type: "success",
        content: "Movimentação registrada com sucesso.",
        className: "mt-8",
      };
      ValidityMessageValidation(successData, messageApi);
      onUpdateFinish?.();
      onClose();
    } catch (error) {
      console.error("Erro ao criar movimentação:", error);
      const errorData: ValidityMessage = {
        type: "error",
        content: "Erro ao criar movimentação.",
        className: "mt-8",
      };
      ValidityMessageValidation(errorData, messageApi);
    } finally {
      setMovement(initialMovement);
      setIsModalLoading(false);
    }
  };

  const updateMovement = async () => {
    try {
      const response = await fetch("/estoque/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movement),
      });
      if (!response.ok) {
        const errorData: ValidityMessage = {
          type: "error",
          content: "Erro ao atualizar movimentação.",
          className: "mt-8",
        };
        ValidityMessageValidation(errorData, messageApi);
        setIsModalLoading(false);
        return;
      }
      // ====== ADJUSTED: don't create an unused `data` variable; just await the json (or, if you need it, use it) ======
      await response.json();
      const successData: ValidityMessage = {
        type: "success",
        content: "Movimentação atualizada com sucesso.",
        className: "mt-8",
      };
      ValidityMessageValidation(successData, messageApi);
      onUpdateFinish?.();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar movimentação:", error);
      const errorData: ValidityMessage = {
        type: "error",
        content: "Erro ao atualizar movimentação.",
        className: "mt-8",
      };
      ValidityMessageValidation(errorData, messageApi);
    } finally {
      setMovement(initialMovement);
      setIsModalLoading(false);
    }
  };

  return (
    <StockMovementModal
      isModalOpen={isOpen}
      isModalLoading={isModalLoading}
      movement={movement}
      products={products}
      isLoadingProducts={isLoadingProducts}
      handleInputChange={handleInputChange}
      handleOk={handleOk}
      handleCancel={handleCancel}
      validateRequiredInputs={validateRequiredInputs}
      modalMode={modalMode}
      selectedMovement={selectedMovement}
    />
  );
}
