"use client"
import { signIn } from "next-auth/react";
import { formLoginSchema } from "./schema";
import { AccountValidation } from "../authActions";
import { logUserLogin } from "@/app/actions/logsActions";


export default async function loginAction(_prevState: any, formData: FormData) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as {
        email: string;
        password: string;
    };

    const validation = formLoginSchema.safeParse(data);
    if (!validation.success) {
        const errors = validation.error.errors.map((error) => ({
            field: error.path.join('.'),
            message: error.message,
        }));

        return {
            success: false,
            message: "Erro de validação",
            errors,
        };
    }

    try {
        const user = await AccountValidation(data.email)
        if (user.success) {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (result?.error) {
                if (result.error === 'CredentialsSignin') {
                    return { success: false, message: 'Dados de login incorretos.' };
                } else if (result.error === 'UserNotFound') {
                    return { success: false, message: 'Usuário não cadastrado.' };
                } else {
                    return { success: false, message: 'Erro ao fazer login. Tente novamente.' };
                }
            }
        } else {
            return { success: false, message: user.message };
        }



        return { success: true, redirectTo: '/dashboard' };
    } catch (e: any) {
        console.error(e);
        return { success: false, message: 'Ops, algum erro aconteceu!' };
    }
}