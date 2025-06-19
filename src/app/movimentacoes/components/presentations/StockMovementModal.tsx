import { Modal, Form, Select, InputNumber, Button } from "antd";
import { StockMovementModalProps } from "@/types/StockMovementProps";
import { ModalMode } from "@/types/ModalMode";

export default function StockMovementModal({
  isModalOpen,
  isModalLoading,
  movement,
  products,
  isLoadingProducts,
  handleInputChange,
  handleOk,
  handleCancel,
  validateRequiredInputs,
  modalMode,
}: StockMovementModalProps) {
  return (
    <Modal
      open={isModalOpen}
      title={modalMode === ModalMode.CREATE ? "Registrar Movimentação" : "Movimentação"}
      okText={modalMode === ModalMode.CREATE ? "Criar" : "Salvar"}
      cancelText="Cancelar"
      confirmLoading={isModalLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      width={500}
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
        <Form.Item
          label="Produto"
          hasFeedback
          validateStatus={validateRequiredInputs(movement.productId)}
          required
        >
          <Select
            placeholder="Selecione um produto"
            value={movement.productId || undefined}
            onChange={(value) => handleInputChange("productId", value)}
            loading={isLoadingProducts}
            options={(products ?? []).map((p) => ({ label: p.name, value: p.id }))}
            disabled={modalMode === ModalMode.VIEW}
          />
        </Form.Item>
        <Form.Item label="Tipo" required>
          <Select
            value={movement.type}
            onChange={(value) => handleInputChange("type", value)}
            disabled={modalMode === ModalMode.VIEW}
            options={[
              { label: "Entrada", value: "in" },
              { label: "Saída", value: "out" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Quantidade"
          hasFeedback
          validateStatus={validateRequiredInputs(movement.quantity)}
          required
        >
          <InputNumber
            min={1}
            value={movement.quantity}
            onChange={(value) => handleInputChange("quantity", value)}
            disabled={modalMode === ModalMode.VIEW}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
