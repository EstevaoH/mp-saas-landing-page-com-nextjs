"use server";

import db from "@/lib/db";
import { auth } from "../../../../../auth";


export async function checkUserPlan() {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return { success: false, message: "Usuário não autenticado." };
        }

        const user = await db.user.findUnique({
            where: { email: session.user.email },
            select: { plan: true, planId: true },
        });

        if (!user) {
            return { success: false, message: "Usuário não encontrado." };
        }

        switch (user.planId) {
            case 1:
                return {
                    success: true,
                    message: "Você está no plano gratuito. Atualize para o Pro Premium VIP para acessar mais recursos.",
                    plan: user.plan,
                    planId: user.planId
                };
            case 2:
                return {
                    success: true,
                    message: "Você está no plano Pro. Aproveite todos os benefícios!",
                };
            case 3:
                return {
                    success: true,
                    message: "Você está no plano Premium. Parabéns pelo upgrade!",
                };
            default:
                return {
                    success: false,
                    message: "Plano não reconhecido. Entre em contato com o suporte.",
                };
        }
    } catch (error) {
        console.error("Erro ao verificar o plano do usuário:", error);
        return { success: false, message: "Erro ao verificar o plano. Tente novamente." };
    }
}