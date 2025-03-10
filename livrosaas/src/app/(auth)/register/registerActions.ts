'use server';

import db from '@/lib/db';
import { hashSync } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { formRegisterSchema } from './schema';
import { logUserCreated, logUserLogin } from '@/app/actions/logsActions';
import { createFreeSubscription } from '@/app/actions/subscriptionActions';

export default async function registerAction(
  _prevState: any,
  formData: FormData
) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    name: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  };

  const validation = formRegisterSchema.safeParse(data);
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

  const { email, name, password, lastName, username } = validation.data;

  const existingUser = await db.user.findFirst({
    where: {
      OR: [
        { email: email },
        { username: username },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return {
        success: false,
        message: 'Este e-mail já foi cadastrado.',
      };
    } else if (existingUser.username === username) {
      return {
        success: false,
        message: 'Este nome de usuário já está em uso.',
      };
    }
  }
  const freePlan = await db.plan.findFirst({
    where: { name: "free" },
  });
  if (!freePlan) {
    return {
      success: false,
      message: "Plano free não encontrado.",
    };
  }


  const newUser = await db.user.create({
    data: {
      email: email,
      name: name,
      lastName: lastName,
      username: username,
      password: hashSync(password),
      status: "active",
      planId: freePlan.id,
    },
  });
  if (newUser) {
    logUserCreated(newUser);
    logUserLogin(newUser);

    const subscriptionResult = await createFreeSubscription(newUser.id);

    if (!subscriptionResult.success) {
      // console.error("Erro ao criar cobrança gratuita:", subscriptionResult.message);
      return {
        success: false,
        message: "Erro ao criar cobrança gratuita.",
      };
    }
    const redirectUrl = `/auto-login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return redirect(redirectUrl);
  }
}