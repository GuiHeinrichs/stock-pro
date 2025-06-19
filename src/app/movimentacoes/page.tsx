"use client";
import { Table, Button, Tag, Tooltip, message, Modal } from "antd";
import { useState, useEffect } from "react";
import { StockMovement } from "@/types/StockMovement";
import { Eye, Pencil, Trash2 } from "lucide-react";
import StockMovementModalContainer from "./components/containers/StockMovementModalContainer";
import { ModalMode } from "@/types/ModalMode";
import { ValidityMessage } from "@/types/ValidityMessage";
import { ValidityMessageValidation } from "@/app/lib/createValidityMessage";

export default function Movements() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.CREATE);
  const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await fetch("/estoque/api/get");
        const data = await res.json();
        setMovements(Array.isArray(data) ? data : data.movements || []);
      } catch (error) {
        console.error("Erro ao buscar movimentações:", error);
      }
    };
    fetchMovements();
  }, [refetchTrigger]);

  const handleDeleteMovement = async (movement: StockMovement) => {
    Modal.confirm({
      title: "Confirmar exclusão",
      content: `Deseja excluir esta movimentação?`,
      okText: "Excluir",
      cancelText: "Cancelar",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          const response = await fetch(`/estoque/api/delete?id=${movement.id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            const successData: ValidityMessage = {
              type: "success",
              content: "Movimentação removida com sucesso.",
              className: "mt-8",
            };
            ValidityMessageValidation(successData, messageApi);
            setMovements((prev) => prev.filter((m) => m.id !== movement.id));
          }
        } catch (error) {
          const errorData: ValidityMessage = {
            type: "error",
            content: "Erro ao remover movimentação.",
            className: "mt-8",
          };
          ValidityMessageValidation(errorData, messageApi);
        }
      },
    });
  };

  const columns = [
    { title: "Produto", dataIndex: ["Product", "name"], key: "product" },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      render: (value: string) => (
        <Tag color={value === "in" ? "green" : "red"}>
          {value === "in" ? "Entrada" : "Saída"}
        </Tag>
      ),
    },
    { title: "Quantidade", dataIndex: "quantity", key: "quantity" },
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: StockMovement) => (
        <div className="flex justify-center gap-2">
          <Tooltip color="#F1592A" title="Visualizar">
            <Button
              size="small"
              icon={<Eye size={16} />}
              onClick={() => {
                setSelectedMovement(record);
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
                setSelectedMovement(record);
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
              onClick={() => handleDeleteMovement(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="px-4 py-4 md:px-10 xl:px-20 space-y-8 bg-[#f9f9f9] min-h-screen">
      {contextHolder}
      <Table
        columns={columns}
        bordered
        pagination={{ position: ["bottomCenter"] }}
        dataSource={movements.map((m) => ({ ...m, key: m.id }))}
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
          + Nova Movimentação
        </Button>
      </div>
      <StockMovementModalContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        messageApi={messageApi}
        movementsSetter={setMovements}
        modalMode={modalMode}
        selectedMovement={selectedMovement}
        onUpdateFinish={() => setRefetchTrigger((prev) => !prev)}
      />
    </div>
  );
}
