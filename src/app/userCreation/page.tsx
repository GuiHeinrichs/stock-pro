"use client";
import { Form, Input, Select, Button } from "antd";
import { useState, useEffect } from "react";
import { ClientService } from "../services/clientService";
import { Client } from "@/types/Client";
import { Toaster, toast } from "sonner";
import { User } from "@/types/User";

const { Option } = Select;

export default function CreateUserPage() {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clients = await ClientService.getAll();
        setClients(clients);
      } catch (error: unknown) {
        console.error("Erro ao carregar clientes:", error);
        toast.error("Erro ao carregar clientes.");
      }
    };

    fetchClients();
  }, []);

  const handleFinish = async (values: User) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        role: Number(values.role),
        clientId: Number(values.clientId),
      };
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar usuário.");
      }

      if (data.emailSent === false) {
        toast.warning(
          "Usuário criado, mas houve falha ao enviar o e-mail de boas-vindas."
        );
      } else {
        toast.success("Usuário criado com sucesso!");
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || "Erro ao criar usuário.");
    } finally {
      values = {} as User;
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card dark:bg-card-dark rounded shadow">
      <Toaster richColors position="top-right" />
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
        <Form.Item name="clientId" label="Cliente" rules={[{ required: true }]}>
          <Select
            showSearch
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            style={{ width: "100%" }}
            options={clients.map((client) => ({
              value: client.idClient,
              label: client.name,
            }))}
          />
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
