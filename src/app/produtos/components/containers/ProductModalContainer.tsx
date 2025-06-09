"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import ProductModal from "../presentations/ProductModal";
import { useCategories } from "@/app/hooks/categories/useCategories";
import { useSuppliers } from "@/app/hooks/suppliers/useSuppliers";
import { Product } from "@/types/Product";
import { ValidityMessage } from "@/types/ValidityMessage";
import { ValidityMessageValidation } from "@/app/lib/createValidityMessage";
import { MessageInstance } from "antd/es/message/interface";
import { ModalMode } from "@/types/ModalMode";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  messageApi: MessageInstance;
  productsSetter: Dispatch<SetStateAction<Product[]>>;
  modalMode: ModalMode;
  selectedProduct: Product | null;
  onUpdateFinish?: () => void;
};

const initialProductState: Product = {
  name: "",
  sku: "",
  barcode: "",
  description: "",
  categoryId: undefined,
  price: 0,
  sellingPrice: 0,
  quantity: 0,
  ProductDetail: {
    brand: "",
    model: "",
    dimensions: "",
    weight: 0,
    color: "",
    material: "",
    additionalInfo: "",
  },
};

const ProductModalContainer = ({
  isOpen,
  onClose,
  messageApi,
  productsSetter,
  modalMode,
  selectedProduct,
  onUpdateFinish,
}: Props) => {
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>(initialProductState);

  const { categories, isLoadingCategories } = useCategories();
  const { suppliers, isLoadingSuppliers } = useSuppliers();

  useEffect(() => {
    if (
      (modalMode === ModalMode.EDIT || modalMode === ModalMode.VIEW) &&
      selectedProduct
    ) {
      setNewProduct(selectedProduct);
    }
  }, [modalMode, selectedProduct]);

  const handleInputChange = (field: string, value: any) => {
    if (field === "ProductDetail") {
      setNewProduct((prev) => ({ ...prev, ProductDetail: value }));
    } else {
      setNewProduct((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateRequiredInputs = (value: any) => {
    if (value === undefined || value === "" || value === null) return "error";
    return "success";
  };

  const handleOk = () => {
    setIsModalLoading(true);

    modalMode === ModalMode.CREATE ? createProduct() : updateProduct();
  };

  const handleCancel = () => {
    setNewProduct(initialProductState);
    onClose();
  };

  const createProduct = async () => {
    try {
      const response = await fetch("/produtos/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorData: ValidityMessage = {
          type: "error",
          content: "Erro ao criar produto.",
          className: "mt-8",
        };
        ValidityMessageValidation(errorData, messageApi);
        setIsModalLoading(false);
        return;
      }

      const responseData = await response.json();
      productsSetter((prev) => [...prev, responseData]);

      const successData: ValidityMessage = {
        type: "success",
        content: "Produto criado com sucesso.",
        className: "mt-8",
      };
      ValidityMessageValidation(successData, messageApi);
      onUpdateFinish?.();
      onClose();
    } catch (error) {
      console.error("ECP1: erro ao criar produto:", error);
      const errorData: ValidityMessage = {
        type: "error",
        content: "Erro ao criar produto.",
        className: "mt-8",
      };
      ValidityMessageValidation(errorData, messageApi);
    } finally {
      setNewProduct(initialProductState);
      setIsModalLoading(false);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await fetch("/produtos/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorData: ValidityMessage = {
          type: "error",
          content: "Erro ao atualizar produto.",
          className: "mt-8",
        };
        ValidityMessageValidation(errorData, messageApi);
        setIsModalLoading(false);
        return;
      }

      const responseData = await response.json();

      const successData: ValidityMessage = {
        type: "success",
        content: "Produto atualizado com sucesso.",
        className: "mt-8",
      };
      ValidityMessageValidation(successData, messageApi);
      onUpdateFinish?.();
      onClose();
    } catch (error) {
      console.error("EUP1: erro ao atualizar produto:", error);
      const errorData: ValidityMessage = {
        type: "error",
        content: "Erro ao atualizar produto.",
        className: "mt-8",
      };
      ValidityMessageValidation(errorData, messageApi);
    } finally {
      setNewProduct(initialProductState);
      setIsModalLoading(false);
    }
  };

  return (
    <ProductModal
      isModalOpen={isOpen}
      isModalLoading={isModalLoading}
      newProduct={newProduct}
      categories={categories}
      suppliers={suppliers}
      isLoadingCategories={isLoadingCategories}
      isLoadingSuppliers={isLoadingSuppliers}
      handleInputChange={handleInputChange}
      handleOk={handleOk}
      handleCancel={handleCancel}
      validateRequiredInputs={validateRequiredInputs}
      modalMode={modalMode}
      selectedProduct={selectedProduct}
    />
  );
};

export default ProductModalContainer;
