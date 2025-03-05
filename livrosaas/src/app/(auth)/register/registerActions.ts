'use server';

import db from '@/lib/db';
import { hashSync } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { formRegisterSchema } from './schema';
import { signIn } from 'next-auth/react';

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

  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return {
      message: 'Este e-mail já foi cadastrado.',
      success: false,
    };
  }

  const existingUsername = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  if (existingUsername) {
    return {
      message: 'Este nome de usuário já está em uso.',
      success: false,
    };
  }
  const newUser = await db.user.create({
    data: {
      email: email,
      name: name,
      lastName: lastName,
      username: username,
      password: hashSync(password),
    },
  });
  if (newUser) {
    const redirectUrl = `/auto-login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return redirect(redirectUrl);
  }
}