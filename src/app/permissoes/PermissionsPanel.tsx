"use client";
import { useState } from "react";
import { UserRole } from "@/types/UserRole";

const modules = ["Produtos", "Movimentações", "Categorias", "Fornecedores"];

const roles = [
  { id: UserRole.OPERADOR, name: "Operador" },
  { id: UserRole.GERENTE, name: "Gerente" },
  { id: UserRole.ADMIN, name: "Administrador" },
];

type PermissionsState = Record<number, Record<string, boolean>>;

export default function PermissionsPanel() {
  const [permissions, setPermissions] = useState<PermissionsState>(() => {
    const initial: PermissionsState = {};
    roles.forEach((r) => {
      initial[r.id] = {} as Record<string, boolean>;
      modules.forEach((m) => {
        initial[r.id][m] = r.id === UserRole.ADMIN;
      });
    });
    return initial;
  });

  const toggle = (roleId: number, module: string) => {
    setPermissions((prev) => ({
      ...prev,
      [roleId]: { ...prev[roleId], [module]: !prev[roleId][module] },
    }));
  };

  return (
    <div className="p-6 bg-white border border-[#E0E0E0] rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-4">Controle Avançado de Permissões</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="p-2 text-left">Módulo</th>
            {roles.map((role) => (
              <th key={role.id} className="p-2 text-center">
                {role.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module} className="border-t">
              <td className="p-2 font-medium">{module}</td>
              {roles.map((role) => (
                <td key={role.id} className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={permissions[role.id][module]}
                    onChange={() => toggle(role.id, module)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
