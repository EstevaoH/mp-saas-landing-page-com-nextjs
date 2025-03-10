"use server";

import db from "@/lib/db";
import { auth } from "../../../../../auth";


export async function cancelSubscription() {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return {
        success: false,
        message: "Usuário não autenticado.",
        errorCode: "UNAUTHENTICATED",
      };
    }
    await db.user.update({
      where: { email: session.user.email },
      data: { status: "inactive" },
    });

    return {
      success: true,
      message: "Assinatura cancelada com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao cancelar a assinatura:", error);
    return {
      success: false,
      message: "Erro ao cancelar a assinatura. Tente novamente.",
      errorCode: "DATABASE_ERROR",
    };
  }
}