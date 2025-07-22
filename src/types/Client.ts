export type Client = {
  idClient: number;
  name: string;
  corporateName?: string | null;
  phone?: string | null;
  state?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  cpfCnpj: string;
  isActive: boolean;
};
