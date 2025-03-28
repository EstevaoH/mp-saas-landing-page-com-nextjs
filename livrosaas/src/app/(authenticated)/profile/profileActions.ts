"use server"
import db from "@/lib/db";
import { changePasswordSchema, desactiveAccountSchema, formProfileSchema } from "./schema";
import bcrypt from "bcryptjs";
import { auth } from "../../../../auth";
import { logProfileUpdated } from "@/app/actions/logsActions";

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

export async function getUserSettings(userId: number) {
  try {
    const settings = await db.userSettings.findUnique({
      where: { userId },
    });
    if (!settings) {
      return {
        success: false,
        message: 'Configurações do usuário não encontradas.',
      };
    }

    return {
      success: true,
      settings,
    };
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return {
      success: false,
      message: 'Erro ao buscar configurações.',
    };
  }
}
export async function updateUserSetting(userId: number, key: string, value: any) {
  try {
    const setting = await db.userSettings.upsert({
      where: { userId },
      select: {user: true},
      update: { [key]: value },
      create: { userId, [key]: value },
    });
    logProfileUpdated(setting.user)
    return {
      success: true,
      setting,
    };
  } catch (error) {
    console.error("Erro ao atualizar configuração:", error);
    return {
      success: false,
      message: "Erro ao atualizar configuração.",
    };
  }
}

// export async function getNotificationStatus(email: string) {
//   try {
//     const user = await db.user.findUnique({
//       where: { email },
//       select: { notificationsEnabled: true },
//     });

//     if (!user) {
//       return {
//         success: false,
//         message: 'Usuário não encontrado.',
//       };
//     }

//     return {
//       success: true,
//       enabled: user.notificationsEnabled,
//     };
//   } catch (error) {
//     console.error('Erro ao buscar status das notificações:', error);
//     return {
//       success: false,
//       message: 'Erro ao buscar status das notificações.',
//     };
//   }
// }

// export async function toggleNotifications(email: string) {
//   try {
//     const user = await db.user.findUnique({
//       where: { email },
//       select: {
//         id: true,
//         email: true,
//         notificationsEnabled: true,
//       },
//     });

//     if (!user) {
//       return {
//         success: false,
//         message: 'Usuário não encontrado.',
//       };
//     }

//     const userUpdate = await db.user.update({
//       where: { email },
//       data: { notificationsEnabled: !user.notificationsEnabled },
//     });

//     // Registra a ação no log
//     await logProfileUpdated(userUpdate);

//     return {
//       success: true,
//       enabled: userUpdate.notificationsEnabled,
//     };
//   } catch (error) {
//     console.error('Erro ao alternar notificações:', error);
//     return {
//       success: false,
//       message: 'Erro ao alternar notificações.',
//     };
//   }
// }


export async function changePasswordActions(_prevState: any, formData: FormData) {
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

  // Verificar se as senhas coincidem
  if (newPassword !== confirmPassword) {
    return {
      success: false,
      errors: { confirmPassword: ["As senhas não coincidem."] },
    };
  }

  try {
    const userId = ID;
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

    // Verificar se a senha atual está correta
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Erro de validação",
        errors: { currentPassword: ["Senha atual incorreta."] },
      };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

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

export async function desactiveAccountActions(_prevState: any, formData: FormData) {
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
  const session = await auth();
  if (!session || !session.user?.email) {
    return {
      success: false,
      message: "Usuário não autenticado.",
    };
  }

  try {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return {
        success: false,
        message: "Usuário não encontrado.",
      };
    }
    const { desactiveAccountCode } = validation.data;

    const isPasswordValid = bcrypt.compare(user.password, desactiveAccountCode);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Senha incorreta.",
      };
    }

    // Atualiza o status da conta para "desactive"
    await db.user.update({
      where: { id: user.id },
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