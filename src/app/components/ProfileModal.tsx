"use client";
import { Modal, Form, Input } from "antd";
import Image from "next/image";
import { UserRole } from "@/types/UserRole";

export type Profile = {
  name: string;
  email: string;
  role: number;
  image?: string | null;
};

type Props = {
  isModalOpen: boolean;
  isModalLoading: boolean;
  profile: Profile;
  onChange: (field: string, value: any) => void;
  onOk: () => void;
  onCancel: () => void;
};

const roleLabels = {
  [UserRole.OPERADOR]: "Operador",
  [UserRole.ADMIN]: "Administrador",
  [UserRole.GERENTE]: "Gerente",
};

export default function ProfileModal({
  isModalOpen,
  isModalLoading,
  profile,
  onChange,
  onOk,
  onCancel,
}: Props) {
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange("image", reader.result);
    };
    reader.readAsDataURL(file);
  };
  console.log("ProfileModal", profile);
  return (
    <Modal
      open={isModalOpen}
      title="Editar Perfil"
      okText="Salvar"
      cancelText="Cancelar"
      confirmLoading={isModalLoading}
      onOk={onOk}
      onCancel={onCancel}
      width={500}
    >
      <Form layout="vertical">
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src={profile.image || "/profile-default.png"}
            width={64}
            height={64}
            alt="Avatar"
            className="rounded-full border border-border dark:border-border-dark"
          />
          <label className="cursor-pointer text-sm text-muted dark:text-muted-dark hover:underline mb-6">
            Alterar foto
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <Form.Item label="Nome" required>
          <Input
            value={profile.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="E-mail">
          <Input value={profile.email} disabled />
        </Form.Item>
        <Form.Item label="Papel">
          <Input
            value={roleLabels[profile.role as keyof typeof roleLabels]}
            disabled
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
