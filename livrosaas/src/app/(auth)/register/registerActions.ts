'use server';

import db from '@/lib/db';
import { hashSync } from 'bcryptjs';
import { redirect } from 'next/navigation';

export default async function registerAction(
  _prevState: any,
  formData: FormData
) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
  };

  // se não tiver email, nome ou senha, retorna erro
  if (!data.email || !data.name || !data.password) {
    return {
      message: 'Preencha todos os campos',
      success: false,
    };
  }
  // Validação do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      message: 'Email inválido',
      success: false,
    };
  }

  // se um usuário já existe.
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

  await db.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashSync(data.password),
    },
  });

  return redirect('/dashboard');
}