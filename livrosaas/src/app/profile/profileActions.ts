"use server"
import db from "@/lib/db";
import { use } from "react";
import { formProfileSchema } from "./schema";

interface UserData {
    id: number;
    name: string;
    lastName: string;
    username: string;
    email: string;
}

let ID: number;

export default async function profileActions(
    _prevState: any,
    formData: FormData,
) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as {
        name: string;
        lastName: string;
        username: string;
        email: string;
    };
    const validation = formProfileSchema.safeParse(data);
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

    const updatedUser = await db.user.update({
        where: { id: ID },
        data: {
            name: data.name,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
        },
    });

    return {
        success: true,
        message: 'Dados atualizados com sucesso!',
        user: updatedUser,
    };
    try {
    } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
        return {
            success: false,
            message: 'Erro ao atualizar dados. Tente novamente.',
        };
    }
}
export async function getUserData(userId: number): Promise<UserData | null> {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                lastName: true,
                username: true,
                email: true,
            },
        });
        if (user) {
            ID = user?.id
        }
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        return user;
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        throw new Error('Erro ao buscar dados do usuário.');
    }
}