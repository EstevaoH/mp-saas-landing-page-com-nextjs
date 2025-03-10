"use server";
import { sendPasswordResetEmail as sendResetEmail } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { forgotPasswrodSchema } from "./check-email/schema";

export async function sendPasswordResetEmail(_prevState: any, formData: FormData) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as {
        email: string;
    };
    const validation = forgotPasswrodSchema.safeParse(data);
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
        await sendResetEmail(data.email);
        return { success: true, message: "Email de recuperação enviado com sucesso!" };
    } catch (error) {
        return {success: false, message: "Erro ao enviar email de recuperação. Tente novamente." };
    }
}
export async function AccountValidation(email: string) {
    try {
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { success: false, message: 'Usuário não cadastrado.' };
        }
        if (user.status === "desactive") {
            return { success: false, message: 'Esta conta está desativada. Entre em contato com o suporte para reativá-la.' };
        }
        return { success: true, message: 'Conta válida.' };
    } catch (error) {
        console.error("Erro ao validar a conta:", error);
        return { success: false, message: 'Erro ao validar a conta. Tente novamente.' };
    }
}