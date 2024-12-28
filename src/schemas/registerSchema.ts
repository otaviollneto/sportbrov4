import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0); // Remove time part for comparison

export const step1Schema = z.object({
  documentType: z.enum(["cpf", "passport"], {
    required_error: "Selecione o tipo de documento",
  }),
  document: z.string().min(1, "Documento obrigatório"),
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone obrigatório"),
  sex: z.enum(["Masculino", "Feminino"], {
    required_error: "Selecione o sexo",
  }),
  birthDate: z
    .date()
    .max(today, "Data de nascimento não pode ser maior que hoje"),
});

export const step2Schema = z.object({
  country: z.string().min(1, "País obrigatório"),
  cep: z.string().min(8, "CEP inválido"),
  address: z.string().min(3, "Endereço obrigatório"),
  number: z.string().min(1, "Número obrigatório"),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  complement: z.string().optional(),
  state: z.string().min(1, "Estado obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
});

export const step3Schema = z.object({
  isPDC: z.enum(["Sim", "Nao"], {
    required_error: "Selecione se é PDC",
  }),
  pdcName: z.string().optional(),
  teamName: z.string().optional(),
  emergencyContactName: z
    .string()
    .min(1, "Nome do contato de emergência obrigatório"),
  emergencyContactPhone: z
    .string()
    .min(10, "Telefone do contato de emergência obrigatório"),
});

// Corrigindo o passo 4
export const step4Schema = z.object({
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

// Mesclando os esquemas
export const registerSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas devem coincidir",
        path: ["confirmPassword"],
      });
    }
  });
