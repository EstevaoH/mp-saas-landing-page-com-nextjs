import db from '@/lib/db';

import { BillingCycle } from '@prisma/client';

export async function createFreeSubscription(userId: number) {
    try {
        const freePlan = await db.plan.findUnique({
            where: { name: "free", status: "active", id: 1 },
        });

        if (!freePlan) {
            throw new Error("Plano gratuito não encontrado.");
        }
        const user = await db.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        const subscription = await db.payment.create({
            data: {
                userId: userId,
                planId: freePlan.id,
                status: "active",
                nextBillingDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                amount: freePlan.price,
                billingCycle: BillingCycle.MONTHLY,
                paymentMethod: "free"
            },
        });

        return {
            success: true,
            subscription,
            message: "Assinatura gratuita criada com sucesso.",
        };
    } catch (error) {
        console.error("Erro ao criar assinatura gratuita:", error);
        return {
            success: false,
            message: "Erro ao criar assinatura gratuita.",
            error: error instanceof Error ? error.message : "Erro desconhecido",
        };
    }
}