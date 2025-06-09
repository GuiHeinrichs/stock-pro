import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Row,
  Col,
  Collapse,
  Button,
} from "antd";
import { Category } from "@/types/Category";
import { Props } from "@/types/ProductProps";
import { ModalMode } from "@/types/ModalMode";
import { Supplier } from "@/types/Supplier";

const ProductModal = ({
  isModalOpen,
  isModalLoading,
  newProduct,
  categories,
  suppliers,
  isLoadingCategories,
  isLoadingSuppliers,
  handleInputChange,
  handleOk,
  handleCancel,
  validateRequiredInputs,
  modalMode,
  selectedProduct,
}: Props & { modalMode: ModalMode }) => {
  return (
    <Modal
      open={isModalOpen}
      title="Criar novo produto"
      okText="Criar"
      cancelText="Cancelar"
      confirmLoading={isModalLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      width={700}
      footer={
        modalMode === ModalMode.VIEW
          ? null
          : [
              <Button key="cancel" onClick={handleCancel}>
                Cancelar
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                {modalMode === ModalMode.CREATE ? "Criar" : "Salvar"}
              </Button>,
            ]
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Nome"
              hasFeedback
              validateStatus={validateRequiredInputs(newProduct.name)}
              required
            >
              <Input
                value={newProduct.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <Form.Item
              label="SKU"
              hasFeedback
              validateStatus={validateRequiredInputs(newProduct.sku)}
              required
            >
              <Input
                value={newProduct.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <Form.Item
              label="Código de Barras"
              hasFeedback
              validateStatus={validateRequiredInputs(newProduct.barcode)}
              required
            >
              <Input
                value={newProduct.barcode!}
                onChange={(e) => handleInputChange("barcode", e.target.value)}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <Form.Item label="Descrição">
              <Input
                value={newProduct.description!}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <Form.Item
              label="Categoria"
              hasFeedback
              validateStatus={validateRequiredInputs(newProduct.categoryId)}
              required
            >
              <Select
                placeholder="Selecione uma categoria"
                value={newProduct.categoryId}
                onChange={(value) => handleInputChange("categoryId", value)}
                loading={isLoadingCategories}
                allowClear
                options={(categories ?? []).map((category: Category) => ({
                  label: category.title,
                  value: category.id,
                }))}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <Form.Item
              label="Fornecedor"
              hasFeedback
              validateStatus={validateRequiredInputs(newProduct.supplierId)}
              required
            >
              <Select
                placeholder="Selecione um fornecedor"
                value={newProduct.supplierId}
                onChange={(value) => handleInputChange("supplierId", value)}
                loading={isLoadingSuppliers}
                allowClear
                options={(suppliers ?? []).map((supplier: Supplier) => ({
                  label: supplier.name,
                  value: supplier.id,
                }))}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <div className="flex gap-4">
              <Form.Item
                label="Preço de Custo"
                hasFeedback
                validateStatus={validateRequiredInputs(newProduct.price)}
                required
              >
                <InputNumber
                  defaultValue={5.0}
                  className="!w-[9rem]"
                  value={newProduct.price}
                  formatter={(value) =>
                    `R$ ${value}`
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      .replace(",", ".")
                  }
                  parser={(value) =>
                    value
                      ? parseFloat(
                          value.replace(/R\$\s?|(\.*)/g, "").replace(",", ".")
                        )
                      : 0
                  }
                  onChange={(value) => handleInputChange("price", value)}
                  disabled={modalMode === ModalMode.VIEW}
                />
              </Form.Item>
              <Form.Item
                label="Preço de Venda"
                hasFeedback
                validateStatus={validateRequiredInputs(newProduct.sellingPrice)}
                required
              >
                <InputNumber
                  className="!w-[9rem]"
                  value={newProduct.sellingPrice}
                  formatter={(value) =>
                    `R$ ${value}`
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      .replace(",", ".")
                  }
                  parser={(value) =>
                    value
                      ? parseFloat(
                          value.replace(/R\$\s?|(\.*)/g, "").replace(",", ".")
                        )
                      : 0
                  }
                  onChange={(value) => handleInputChange("sellingPrice", value)}
                  disabled={modalMode === ModalMode.VIEW}
                />
              </Form.Item>
              <Form.Item label="Quantidade">
                <InputNumber
                  className="!w-[9rem]"
                  value={newProduct.quantity}
                  onChange={(value) => handleInputChange("quantity", value)}
                  disabled={modalMode === ModalMode.VIEW}
                />
              </Form.Item>
            </div>
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Informações Técnicas",
                  children: (
                    <>
                      <Form.Item label="Marca">
                        <Input
                          value={newProduct.ProductDetail?.brand}
                          onChange={(e) =>
                            handleInputChange("ProductDetail", {
                              ...newProduct.ProductDetail,
                              brand: e.target.value,
                            })
                          }
                          disabled={modalMode === ModalMode.VIEW}
                        />
                      </Form.Item>
                      <Form.Item label="Modelo">
                        <Input
                          value={newProduct.ProductDetail?.model}
                          onChange={(e) =>
                            handleInputChange("ProductDetail", {
                              ...newProduct.ProductDetail,
                              model: e.target.value,
                            })
                          }
                          disabled={modalMode === ModalMode.VIEW}
                        />
                      </Form.Item>
                      <Form.Item label="Dimensões">
                        <Input
                          value={newProduct.ProductDetail?.dimensions}
                          onChange={(e) =>
                            handleInputChange("ProductDetail", {
                              ...newProduct.ProductDetail,
                              dimensions: e.target.value,
                            })
                          }
                          disabled={modalMode === ModalMode.VIEW}
                        />
                      </Form.Item>
                      <Form.Item label="Peso (kg)">
                        <InputNumber
                          value={newProduct.ProductDetail?.weight}
                          className="w-full"
                          onChange={(value) =>
                            handleInputChange("ProductDetail", {
                              ...newProduct.ProductDetail,
                              weight: value,
                            })
                          }
                          disabled={modalMode === ModalMode.VIEW}
                        />
                      </Form.Item>
                      <Form.Item label="Cor">
                        <Input
                          value={newProduct.ProductDetail?.color}
                          onChange={(e) =>
                            handleInputChange("ProductDetail", {
                              ...newProduct.ProductDetail,
                              color: e.target.value,
                            })
                          }
                          disabled={modalMode === ModalMode.VIEW}
                        />
                      </Form.Item>
                      <Form.Item label="Material">
                        <Input
                          value={newProduct.ProductDetail?.material}
                          onChange={(e) =>
                            handleInputChange("ProductDetail", {
                              ...newProduct.ProductDetail,
                              material: e.target.value,
                            })
                          }
                          disabled={modalMode === ModalMode.VIEW}
                        />
                      </Form.Item>
                      <Form.Item label="Informações Adicionais">
                        <Input.TextArea
                          rows={3}
                          value={newProduct.ProductDetail?.additionalInfo}
                          onChange={(e) =>
                            handleInputChange("ProductDetail", {
                              ...newProduct.ProductDetail,
                              additionalInfo: e.target.value,
                            })
                          }
                          disabled={modalMode === ModalMode.VIEW}
                        />
                      </Form.Item>
                    </>
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductModal;
