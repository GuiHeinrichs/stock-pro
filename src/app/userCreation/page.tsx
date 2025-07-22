"use client";
import { Form, Input, Select, Button, message } from "antd";
import { useState } from "react";

const { Option } = Select;

export default function CreateUserPage() {
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch("/userCreation/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar usuário.");
      }

      message.success("Usuário criado com sucesso!");
    } catch (err: any) {
      message.error(err.message || "Erro ao criar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card dark:bg-card-dark rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Criar novo usuário</h2>
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Papel" rules={[{ required: true }]}>
          <Select placeholder="Selecione o papel">
            <Option value={0}>Operador</Option>
            <Option value={1}>Administrador</Option>
            <Option value={2}>Gerente</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Criar usuário
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
