import { z } from "zod";

export const checkoutFormSchema = z.object({
  cardNumber: z.string()
    .min(16, "O número do cartão deve ter 16 dígitos")
    .max(16, "O número do cartão deve ter 16 dígitos")
    .regex(/^\d{16}$/, "O número do cartão deve conter apenas números"),

  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "A data de validade deve estar no formato MM/AA"),

  cvc: z.string()
    .min(3, "O CVC deve ter 3 dígitos")
    .max(3, "O CVC deve ter 3 dígitos")
    .regex(/^\d{3}$/, "O CVC deve conter apenas números"),

  cardholderName: z.string()
    .min(1, "O nome do titular é obrigatório")
    .regex(/^[a-zA-Z\s]+$/, "O nome do titular deve conter apenas letras e espaços"),

  country: z.string()
    .min(1, "O país é obrigatório"),

  zipCode: z.string()
    .min(5, "O CEP deve ter 5 dígitos")
    .max(5, "O CEP deve ter 5 dígitos")
    .regex(/^\d{5}$/, "O CEP deve conter apenas números"),

  saveInfo: z.boolean(),
});

export type CheckoutFormInputs = z.infer<typeof checkoutFormSchema>;