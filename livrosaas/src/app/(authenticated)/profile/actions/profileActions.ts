'use server';

import db from "@/lib/db";

import { logProfileUpdated } from "@/app/actions/logsActions";
import { formProfileSchema } from "../schema";

export async function updateProfile(userId: number, _prevState: any, formData: FormData) {
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

  // Verifica se o e-mail ou nome de usuário já está em uso
  const existingUser = await db.user.findFirst({
    where: {
      AND: [
        { id: { not: userId } }, // Exclui o próprio usuário
        { OR: [{ email: data.email }, { username: data.username }] },
      ],
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "E-mail ou nome de usuário já está em uso.",
    };
  }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
    },
  });

  // Registra a ação no log
  await logProfileUpdated(updatedUser);

  return {
    success: true,
    message: 'Dados atualizados com sucesso!',
    user: updatedUser,
  };
}

export async function getUserData(userId: number) {
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

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return user;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw new Error('Erro ao buscar dados do usuário.');
  }
}