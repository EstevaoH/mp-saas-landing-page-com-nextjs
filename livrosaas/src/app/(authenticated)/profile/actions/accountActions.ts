'use server';

import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { desactiveAccountSchema } from "../schema";

export async function desactiveAccount(userId: number, _prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validation = desactiveAccountSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: "Erro de validação.",
      errors: validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    };
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        message: "Usuário não encontrado.",
      };
    }

    const { desactiveAccountCode } = validation.data;

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(desactiveAccountCode, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Senha incorreta.",
      };
    }

    // Atualiza o status da conta para "desactive"
    await db.user.update({
      where: { id: userId },
      data: { status: "desactive" },
    });

    return {
      success: true,
      message: "Conta desativada com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao desativar a conta:", error);
    return {
      success: false,
      message: "Erro ao desativar a conta. Tente novamente.",
    };
  }
}