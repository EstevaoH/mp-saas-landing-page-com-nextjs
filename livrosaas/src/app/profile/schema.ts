import { z } from "zod"
export const formProfileSchema = z.object({
    username: z.string().min(2, { message: "Username deve conter pelo menos dois caracteres." }).max(50),
    name: z.string().trim().pipe(z.string().min(3, { message: 'O campo nome deve conter pelo menos 3 caracteres.' })),
    lastName: z.string().trim().pipe(z.string().min(3, { message: 'O campo sobrenome deve conter pelo menos 3 caracteres.' })),
    email: z.string().email({ message: 'Insira um e-mail válido.' }),
})

export type formProfileInputs = z.infer<typeof formProfileSchema>;