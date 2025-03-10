import db from "@/lib/db";
import { User, Plan, Payment } from "@prisma/client";

// Função utilitária para criar logs
async function createLog(userId: number | null, action: string, details: string) {
  await db.log.create({
    data: {
      userId: userId,
      action: action,
      details: details,
    },
  });
}

// Logs relacionados ao usuário
export async function logUserCreated(user: User) {
  await createLog(user.id, "user_created", `Novo usuário criado: ${user.username} (${user.email})`);
}

export async function logProfileUpdated(user: User) {
  await createLog(user.id, "profile_updated", `Perfil atualizado: ${user.username} (${user.email})`);
}

export async function logUserLogin(user: User) {
  await createLog(user.id, "user_login", `Usuário fez login: ${user.username} (${user.email})`);
}

export async function logUserLogout(user: User) {
  await createLog(user.id, "user_logout", `Usuário fez logout: ${user.username} (${user.email})`);
}

export async function logSettingsUpdated(user: User) {
  await createLog(user.id, "settings_updated", `Configurações atualizadas pelo usuário ${user.username} (${user.email})`);
}

// Logs relacionados a planos
export async function logPlanChanged(user: User, oldPlan: Plan, newPlan: Plan) {
  await createLog(
    user.id,
    "plan_changed",
    `Plano alterado de ${oldPlan.name} para ${newPlan.name} pelo usuário ${user.username} (${user.email})`
  );
}

// Logs relacionados a pagamentos
export async function logPaymentProcessed(user: User, payment: Payment) {
  await createLog(
    user.id,
    "payment_processed",
    `Pagamento realizado: ID ${payment.id}, Valor ${payment.amount}, Método ${payment.paymentMethod}`
  );
}

// Logs relacionados a erros
export async function logErrorOccurred(user: User | null, error: Error) {
  await createLog(
    user?.id || null,
    "error_occurred",
    `Erro: ${error.message}`
  );
}