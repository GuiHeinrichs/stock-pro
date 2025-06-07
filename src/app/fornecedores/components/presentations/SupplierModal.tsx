import { Modal, Form, Input, Row, Col, Button } from "antd";
import { SupplierModalProps } from "@/types/SupplierProps";
import { ModalMode } from "@/types/ModalMode";

export default function SupplierModal({
  isModalOpen,
  isModalLoading,
  supplier,
  handleInputChange,
  handleOk,
  handleCancel,
  validateRequiredInputs,
  modalMode,
}: SupplierModalProps) {
  return (
    <Modal
      open={isModalOpen}
      title={modalMode === ModalMode.CREATE ? "Adicionar Fornecedor" : "Fornecedor"}
      okText={modalMode === ModalMode.CREATE ? "Criar" : "Salvar"}
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
          <Col span={12}>
            <Form.Item
              label="Nome Fantasia"
              hasFeedback
              validateStatus={validateRequiredInputs(supplier.name)}
              required
            >
              <Input
                value={supplier.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <Form.Item label="Razão Social">
              <Input
                value={supplier.corporateName || ""}
                onChange={(e) => handleInputChange("corporateName", e.target.value)}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <Form.Item
              label="CPF/CNPJ"
              hasFeedback
              validateStatus={validateRequiredInputs(supplier.cpfCnpj)}
              required
            >
              <Input
                value={supplier.cpfCnpj}
                onChange={(e) => handleInputChange("cpfCnpj", e.target.value)}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <Form.Item label="Cidade">
              <Input
                value={supplier.city || ""}
                onChange={(e) => handleInputChange("city", e.target.value)}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Contato Principal">
              <Input
                placeholder="Nome"
                value={supplier.mainContactName || ""}
                onChange={(e) => handleInputChange("mainContactName", e.target.value)}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <Form.Item label="Telefone">
              <Input
                value={supplier.mainContactPhone || ""}
                onChange={(e) => handleInputChange("mainContactPhone", e.target.value)}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <Form.Item label="E-mail">
              <Input
                value={supplier.mainContactEmail || ""}
                onChange={(e) => handleInputChange("mainContactEmail", e.target.value)}
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
            <Form.Item label="Condições de Pagamento">
              <Input
                value={supplier.supplierInfo?.paymentTerms || ""}
                onChange={(e) =>
                  handleInputChange("supplierInfo", {
                    ...supplier.supplierInfo,
                    paymentTerms: e.target.value,
                  })
                }
                disabled={modalMode === ModalMode.VIEW}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
