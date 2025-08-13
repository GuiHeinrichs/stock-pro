"use client";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, message } from "antd";
import { Category } from "@/types/Category";
import { ValidityMessage } from "@/types/ValidityMessage";
import { ValidityMessageValidation } from "../lib/createValidityMessage";

const columns = [
  {
    title: "Categoria",
    dataIndex: "title",
    key: "title",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryTitle(e.target.value);
  };

  const handleOk = () => {
    const newCategory: Category = {
      id: categories.length + 1,
      title: newCategoryTitle || "Nova Categoria",
      clientId: null,
    };
    const createCategory = async (category: Category) => {
      try {
        const response = await fetch("/categorias/api/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        });
        if (!response.ok) {
          const data: ValidityMessage = {
            type: "error",
            content:
              "Erro ao criar categoria. Verifique se o título já existe.",
            className: "mt-8",
          };
          ValidityMessageValidation(data, messageApi);
        }
        const responseData = await response.json();
        setCategories((prev) => [...prev, responseData]);

        const data: ValidityMessage = {
          type: "success",
          content: "Categoria criada com sucesso.",
          className: "mt-8",
        };
        ValidityMessageValidation(data, messageApi);
      } catch (error) {
        const data: ValidityMessage = {
          type: "error",
          content: "Erro ao criar categoria.",
          className: "mt-8",
        };
        ValidityMessageValidation(data, messageApi);
      }
    };

    setIsModalLoading(true);
    createCategory(newCategory);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsModalLoading(false);
    }, 2000);
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className="px-4 py-4 md:px-10 xl:px-20 space-y-2 bg-background dark:bg-background-dark min-h-screen">
        <div className="flex justify-end items-center">
          <Button
            type="primary"
            className="!bg-[#F1592A] hover:!bg-[#F1592A]/90 items-end"
            onClick={showModal}
          >
            + Nova Categoria
          </Button>
        </div>
        <Table
          dataSource={categories}
          columns={columns}
          rowKey="id"
          bordered
          size="small"
          pagination={false}
        />
        <Modal
          title="Adicionar Categoria"
          open={isModalOpen}
          onOk={handleOk}
          confirmLoading={isModalLoading}
          onCancel={handleCancel}
          centered
          okText="Salvar"
        >
          <div className="mt-6">
            <Form layout="vertical">
              <Form.Item label="Título" name="title" required>
                <Input
                  placeholder="Digite o título da categoria"
                  allowClear
                  value={newCategoryTitle}
                  onChange={handleTitleChange}
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Categories;
