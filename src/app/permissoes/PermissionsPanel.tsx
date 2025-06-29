"use client";
import { Table, Select, message } from "antd";
import { useUsers } from "@/app/hooks/users/userUsers";
import { UserRole } from "@/types/UserRole";
import {User} from "@/types/User";

const { Option } = Select;

const roles = [
  { id: UserRole.OPERADOR, name: "Operador" },
  { id: UserRole.GERENTE, name: "Gerente" },
  { id: UserRole.ADMIN, name: "Administrador" },
];

export default function PermissionsPanel() {
  const { users = [], mutate } = useUsers();
  const [messageApi, contextHolder] = message.useMessage();

  const handleChangeRole = async (id: number, role: number) => {
    try {
      const res = await fetch("/permissoes/api/update-role", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role }),
      });
      if (!res.ok) throw new Error("fail");
      await mutate();
      messageApi.success("Papel atualizado com sucesso.");
    } catch (error) {
      console.error(error);
      messageApi.error("Erro ao atualizar papel.");
    }
  };

  const columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "E-mail", dataIndex: "email", key: "email" },
    {
      title: "Papel",
      key: "role",
      render: (_: User, record: User) => (
          <Select
              value={record.role}
              onChange={(value) => handleChangeRole(record.id, value)}
          >
            {roles.map((role) => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
            ))}
          </Select>
      ),
    },
  ];

  return (
      <div className="p-6 bg-white border border-[#E0E0E0] rounded-2xl shadow-md">
        {contextHolder}
        <h2 className="text-lg font-bold mb-4">Permissão de usuários</h2>
        <Table
            dataSource={users.map((u: User) => ({ ...u, key: u.id }))}
            columns={columns}
            pagination={false}
        />
      </div>
  );
}