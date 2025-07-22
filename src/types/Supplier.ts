export type SupplierInfo = {
  paymentTerms?: string;
  paymentMethods?: string;
  freightTerms?: string;
};

export type Supplier = {
  id?: number;
  name: string;
  corporateName?: string | null;
  cpfCnpj: string;
  street?: string | null;
  number?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  mainContactName?: string | null;
  mainContactPhone?: string | null;
  mainContactEmail?: string | null;
  secondaryPhone?: string | null;
  secondaryEmail?: string | null;
  website?: string | null;
  clientId: number;
  supplierInfo?: SupplierInfo | null;
  products?: import("./Product").Product[];
  createdAt?: string;
  updatedAt?: string;
};
