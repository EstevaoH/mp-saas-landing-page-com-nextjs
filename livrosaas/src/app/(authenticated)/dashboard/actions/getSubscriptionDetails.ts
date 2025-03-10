"use server";

import db from "@/lib/db";
import { auth } from "../../../../../auth";

export async function getSubscriptionDetails() {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return {
        success: false,
        message: "Usuário não autenticado.",
        errorCode: "UNAUTHENTICATED",
      };
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        plan: {
          select: {
            name: true,
            description: true,
            price: true,
            billingCycle: true,
            status: true,
          },
        },
        status: true,
        nextBillingDate: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Usuário não encontrado.",
        errorCode: "USER_NOT_FOUND",
      };
    }

    return {
      success: true,
      data: {
        name: user.plan?.name || "Nenhum plano ativo",
        description: user.plan.description,
        status: user.status,
        nextBillingDate: user.nextBillingDate || "N/A",
        price: user.plan?.price || 0,
        billingCycle: user.plan?.billingCycle || "N/A",
      },
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes da assinatura:", error);
    return {
      success: false,
      message: "Erro ao buscar detalhes da assinatura. Tente novamente.",
      errorCode: "DATABASE_ERROR",
    };
  }
}

export async function getBillingHistory(userId: number) {
  const billingHistory = await db.payment.findMany({
    where: { userId: userId },
    include: { plan: true }, // Inclui os dados do plano associado
  });


  return billingHistory.map((payment) => ({
    id: payment.id,
    userId: payment.userId,
    planId: payment.planId,
    amount: payment.amount,
    paymentMethod: payment.paymentMethod,
    status: payment.status,
    transactionId: payment.transactionId,
    billingCycle: payment.billingCycle,
    nextBillingDate: payment.nextBillingDate,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  }))
}