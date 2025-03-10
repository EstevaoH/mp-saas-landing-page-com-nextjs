'use server';

import db from "@/lib/db";

import bcrypt from "bcryptjs";
import { changePasswordSchema } from "../schema";

export async function changePassword(userId: number, _prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsedData = changePasswordSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Erro de validação",
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const { currentPassword, newPassword, confirmPassword } = parsedData.data;

  // Verifica se as senhas coincidem
  if (newPassword !== confirmPassword) {
    return {
      success: false,
      errors: { confirmPassword: ["As senhas não coincidem."] },
    };
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        message: "Erro de autenticação",
        errors: { currentPassword: ["Usuário não encontrado."] },
      };
    }

    // Verifica se a senha atual está correta
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Erro de validação",
        errors: { currentPassword: ["Senha atual incorreta."] },
      };
    }

    // Gera o hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualiza a senha no banco de dados
    await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      message: "Senha alterada com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao alterar a senha:", error);
    return {
      success: false,
      errors: { general: ["Ocorreu um erro ao alterar a senha."] },
    };
  }
}