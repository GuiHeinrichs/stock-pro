"use client";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, message, Tooltip } from "antd";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Category } from "@/types/Category";
import { ValidityMessage } from "@/types/ValidityMessage";
import { ValidityMessageValidation } from "../lib/createValidityMessage";
import { ModalMode } from "@/types/ModalMode";
import type { TableColumnsType } from "antd";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.CREATE);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDeleteCategory = (toDeleteCategory: Category) => {
    setCategoryToDelete(toDeleteCategory);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    setIsDeleteLoading(true);
    try {
      const response = await fetch(`/categorias/api/delete?id=${categoryToDelete.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data) {
        const successData: ValidityMessage = {
          type: "success",
          content: "Categoria removida com sucesso.",
          className: "mt-8",
        };
        ValidityMessageValidation(successData, messageApi);
        setCategories((prev) => prev.filter((p) => p.id !== categoryToDelete.id));
      }
    } catch (error: unknown) {
      console.error(
        "Erro ao remover categoria:",
        error instanceof Error ? error.message : "Erro ao remover categoria."
      );
      const errorData: ValidityMessage = {
        type: "error",
        content: "Erro ao remover categoria.",
        className: "mt-8",
      };
      ValidityMessageValidation(errorData, messageApi);
    } finally {
      setIsDeleteLoading(false);
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const columns: TableColumnsType<Category> = [
    {
      title: "Categoria",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ações",
      key: "actions",
      width: 120,
      render: (_: unknown, record: Category) => (
        <div className="flex justify-center gap-1">
          <Tooltip color="#F1592A" title="Visualizar">
            <Button
              size="small"
              icon={<Eye size={16} />}
              onClick={() => {
                setSelectedCategory(record);
                setNewCategoryTitle(record.title);
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
                setSelectedCategory(record);
                setNewCategoryTitle(record.title);
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
              onClick={() => handleDeleteCategory(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const showModal = () => {
    setModalMode(ModalMode.CREATE);
    setSelectedCategory(null);
    setNewCategoryTitle("");
    setIsModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryTitle(e.target.value);
  };

  const handleOk = async () => {
    setIsModalLoading(true);
    try {
      if (modalMode === ModalMode.VIEW) {
        setIsModalOpen(false);
        return;
      }
      if (modalMode === ModalMode.CREATE) {
        const payload = { title: newCategoryTitle || "Nova Categoria" };
        const response = await fetch("/categorias/api/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const data: ValidityMessage = {
            type: "error",
            content: "Erro ao criar categoria.",
            className: "mt-8",
          };
          ValidityMessageValidation(data, messageApi);
        } else {
          const created = await response.json();
          setCategories((prev) => [...prev, created]);
          const data: ValidityMessage = {
            type: "success",
            content: "Categoria criada com sucesso.",
            className: "mt-8",
          };
          ValidityMessageValidation(data, messageApi);
        }
      } else if (modalMode === ModalMode.EDIT && selectedCategory) {
        const response = await fetch("/categorias/api/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selectedCategory.id, title: newCategoryTitle }),
        });
        if (!response.ok) {
          const data: ValidityMessage = {
            type: "error",
            content: "Erro ao atualizar categoria.",
            className: "mt-8",
          };
          ValidityMessageValidation(data, messageApi);
        } else {
          setCategories((prev) =>
            prev.map((c) =>
              c.id === selectedCategory.id ? { ...c, title: newCategoryTitle } : c
            )
          );
          const data: ValidityMessage = {
            type: "success",
            content: "Categoria atualizada com sucesso.",
            className: "mt-8",
          };
          ValidityMessageValidation(data, messageApi);
        }
      }
    } catch (error: unknown) {
      console.error(error instanceof Error ? error.message : "Erro ao salvar categoria.");
      const data: ValidityMessage = {
        type: "error",
        content: "Erro ao salvar categoria.",
        className: "mt-8",
      };
      ValidityMessageValidation(data, messageApi);
    } finally {
      setIsModalLoading(false);
      setIsModalOpen(false);
      setSelectedCategory(null);
      setNewCategoryTitle("");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setNewCategoryTitle("");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/categorias/api/get");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : data.categories || []);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory && (modalMode === ModalMode.EDIT || modalMode === ModalMode.VIEW)) {
      setNewCategoryTitle(selectedCategory.title);
    } else if (modalMode === ModalMode.CREATE) {
      setNewCategoryTitle("");
    }
  }, [selectedCategory, modalMode]);

  return (
    <>
      {contextHolder}
      <div className="px-4 py-4 md:px-10 xl:px-20 space-y-2 bg-background dark:bg-background-dark min-h-screen">
        <Table
          dataSource={categories}
          columns={columns}
          rowKey="id"
          bordered
          size="small"
          pagination={false}
        />
        <Modal
          title={
            modalMode === ModalMode.CREATE
              ? "Adicionar Categoria"
              : modalMode === ModalMode.EDIT
              ? "Editar Categoria"
              : "Detalhes da Categoria"
          }
          open={isModalOpen}
          onOk={modalMode === ModalMode.VIEW ? handleCancel : handleOk}
          confirmLoading={isModalLoading}
          onCancel={handleCancel}
          centered
          okText={modalMode === ModalMode.VIEW ? "Fechar" : "Salvar"}
        >
          <div className="mt-6">
            <Form layout="vertical">
              <Form.Item label="Título" required>
                <Input
                  placeholder={
                    modalMode === ModalMode.VIEW
                      ? ""
                      : "Digite o título da categoria"
                  }
                  allowClear
                  value={newCategoryTitle}
                  onChange={handleTitleChange}
                  disabled={modalMode === ModalMode.VIEW}
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <Modal
          title="Confirmar exclusão"
          open={isDeleteModalOpen}
          onOk={handleConfirmDelete}
          confirmLoading={isDeleteLoading}
          onCancel={handleCancelDelete}
          okText="Excluir"
          okButtonProps={{ danger: true }}
          cancelText="Cancelar"
          centered
        >
          {categoryToDelete && (
            <span>Deseja excluir <b>{categoryToDelete.title}</b>?</span>
          )}
        </Modal>
        <div className="flex justify-end items-center">
          <Button
            type="primary"
            className="!bg-[#F1592A] hover:!bg-[#F1592A]/90 items-end"
            onClick={showModal}
          >
            + Nova Categoria
          </Button>
        </div>
      </div>
    </>
  );
};

export default Categories;
