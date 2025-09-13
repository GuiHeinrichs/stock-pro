import { z } from "zod";

const supplierSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").max(100, "O nome deve ter no máximo 100 caracteres"),
  corporateName: z.string().max(100, "A razão social deve ter no máximo 100 caracteres").optional(),
  cpfCnpj: z.string().min(1, "O CPF/CNPJ é obrigatório").max(18, "O CPF/CNPJ deve ter no máximo 18 caracteres"),
  city: z.string().max(50, "A cidade deve ter no máximo 50 caracteres").optional(),
  mainContactName: z.string().min(1, "O contato principal é obrigatório").max(100, "O contato principal deve ter no máximo 100 caracteres"),
  mainContactPhone: z.string().min(1, "O celular é obrigatório").max(15, "O celular deve ter no máximo 15 caracteres"),
  mainContactEmail: z.string().min(1, "O email é obrigatório").email("Email inválido"),
  supplierInfo: z.object({
    paymentTerms: z.string().max(100, "A condição de pagamento deve ter no máximo 100 caracteres").optional(),
  }).optional(),
});

export default supplierSchema;