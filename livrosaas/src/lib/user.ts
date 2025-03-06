import { compareSync } from 'bcryptjs';
import db from './db';

type User = {
  email: string;
  name: string;
  lastName?: string
  username?: string;
  password?: string;
  status?: string;
  signature?: string;
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

  if (!user) {
    return null;
  }

  const passwordMatch = compareSync(password, user.password);

  if (passwordMatch) {
    return {
      email: user.email,
      name: user.name,
      username: user.username,
      lastName: user.lastName,
      status: user.status,
      signature: user.signature
    };
  }


  return null;
}