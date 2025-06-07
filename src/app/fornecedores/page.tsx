"use client";
import { Table, Button, Tooltip, Input, Form, message, Modal } from "antd";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Supplier } from "@/types/Supplier";
import SupplierModalContainer from "./components/containers/SupplierModalContainer";
import { ModalMode } from "@/types/ModalMode";
import { ValidityMessage } from "@/types/ValidityMessage";
import { ValidityMessageValidation } from "@/app/lib/createValidityMessage";

const { Search } = Input;

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.CREATE);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const handleDeleteSupplier = async (toDelete: Supplier) => {
    Modal.confirm({
      title: "Confirmar exclusão",
      content: `Deseja excluir ${toDelete.name}?`,
      okText: "Excluir",
      cancelText: "Cancelar",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          const response = await fetch(`/fornecedores/api/delete?id=${toDelete.id}`, {
            method: "DELETE",
          });
          const data = await response.json();
          if (data) {
            const successData: ValidityMessage = {
              type: "success",
              content: "Fornecedor removido com sucesso.",
              className: "mt-8",
            };
            ValidityMessageValidation(successData, messageApi);
            setSuppliers((prev) => prev.filter((s) => s.id !== toDelete.id));
          }
        } catch (error) {
          const errorData: ValidityMessage = {
            type: "error",
            content: "Erro ao remover fornecedor.",
            className: "mt-8",
          };
          ValidityMessageValidation(errorData, messageApi);
        }
      },
    });
  };

  const [filters, setFilters] = useState({
    name: "",
    cpfCnpj: "",
    city: "",
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch("/fornecedores/api/get");
        const data = await res.json();
        setSuppliers(Array.isArray(data) ? data : data.suppliers || []);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };
    fetchSuppliers();
  }, [refetchTrigger]);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      const nameMatch =
        filters.name === "" || s.name.toLowerCase().includes(filters.name.toLowerCase());
      const cpfMatch = filters.cpfCnpj === "" || s.cpfCnpj.includes(filters.cpfCnpj);
      const cityMatch = filters.city === "" || (s.city || "").toLowerCase().includes(filters.city.toLowerCase());
      return nameMatch && cpfMatch && cityMatch;
    });
  }, [suppliers, filters]);

  const columns = [
    { title: "Nome/Razão Social", dataIndex: "name", key: "name" },
    { title: "CPF/CNPJ", dataIndex: "cpfCnpj", key: "cpfCnpj" },
    {
      title: "Contato Principal",
      key: "contact",
      render: (_: any, record: Supplier) => (
        <span>
          {record.mainContactName} {record.mainContactPhone && ` - ${record.mainContactPhone}`} {record.mainContactEmail && ` - ${record.mainContactEmail}`}
        </span>
      ),
    },
    { title: "Cidade", dataIndex: "city", key: "city" },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: Supplier) => (
        <div className="flex justify-center gap-2">
          <Tooltip color="#F1592A" title="Visualizar">
            <Button
              size="small"
              icon={<Eye size={16} />}
              onClick={() => {
                setSelectedSupplier(record);
                setModalMode(ModalMode.VIEW);
                setIsModalOpen(true);
              }}
            />
          </Tooltip>
          <Tooltip color="#F1592A" title="Editar">
            <Button
              size="small"
              icon={<Pencil size={16} />}
              onClick={() => {
                setSelectedSupplier(record);
                setModalMode(ModalMode.EDIT);
                setIsModalOpen(true);
              }}
            />
          </Tooltip>
          <Tooltip color="#F1592A" title="Excluir">
            <Button
              size="small"
              icon={<Trash2 size={16} />}
              danger
              onClick={() => handleDeleteSupplier(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="px-4 py-4 md:px-10 xl:px-20 space-y-8 bg-[#f9f9f9] min-h-screen">
      {contextHolder}
      <div className="bg-white p-4 rounded-lg shadow">
        <Form layout="inline" className="flex flex-wrap gap-4 mb-4">
          <Form.Item label="Nome/Razão Social">
            <Search
              placeholder="Buscar por nome"
              allowClear
              value={filters.name}
              onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
              style={{ width: 200 }}
            />
          </Form.Item>
          <Form.Item label="CPF/CNPJ">
            <Input
              placeholder="CPF ou CNPJ"
              allowClear
              value={filters.cpfCnpj}
              onChange={(e) => setFilters((f) => ({ ...f, cpfCnpj: e.target.value }))}
              style={{ width: 160 }}
            />
          </Form.Item>
          <Form.Item label="Cidade">
            <Input
              placeholder="Cidade"
              allowClear
              value={filters.city}
              onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
              style={{ width: 160 }}
            />
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          bordered
          pagination={{ position: ["bottomCenter"] }}
          dataSource={filteredSuppliers.map((s) => ({ ...s, key: s.id }))}
        />
        <div className="flex justify-between items-center mt-4">
          <div />
          <Button
            type="primary"
            className="!bg-[#F1592A] hover:!bg-[#F1592A]/90"
            onClick={() => {
              setModalMode(ModalMode.CREATE);
              setIsModalOpen(true);
            }}
          >
            + Novo Fornecedor
          </Button>
        </div>
        <SupplierModalContainer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          messageApi={messageApi}
          suppliersSetter={setSuppliers}
          modalMode={modalMode}
          selectedSupplier={selectedSupplier}
          onUpdateFinish={() => setRefetchTrigger((prev) => !prev)}
        />
      </div>
    </div>
  );
}
