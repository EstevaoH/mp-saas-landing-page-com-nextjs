import { compareSync } from 'bcryptjs';
import db from './db';
import { logUserLogin } from '@/app/actions/logsActions';

type User = {
  id: number;
  email: string;
  name: string;
  lastName?: string;
  username?: string;
  status?: string;
  planId?: number;
  nextBillingDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function findUserByCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  const fakeHash = "$2a$10$fakehashfakehashfakehashfakehashfakehashfakehashfakehashfakehashfakehashfakehash";
  const passwordMatch = compareSync(password, user?.password || fakeHash);

  if (!user || !passwordMatch) {
    return null;
  }

  logUserLogin(user);
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;


  return null;
}