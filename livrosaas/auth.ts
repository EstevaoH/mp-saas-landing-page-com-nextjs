import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import db from '@/lib/db';
import { logUserLogin } from '@/app/actions/logsActions';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email e senha são obrigatórios.");
          }

          const user = await db.user.findUnique({
            where: { email: credentials.email as string },
          });

          const fakeHash = "$2a$10$fakehashfakehashfakehashfakehashfakehashfakehashfakehashfakehashfakehashfakehash";
          const isValid = await compare(
            credentials.password as string,
            user?.password || fakeHash
          );

          if (!user || !isValid) {
            return null;
          }

          logUserLogin(user); 
          const { password, ...userWithoutPassword } = user;
          return {
            id: userWithoutPassword.id.toString(),
            name: userWithoutPassword.name,
            email: userWithoutPassword.email,
            userName: userWithoutPassword.username,
          };
        } catch (error) {
          console.error("Erro ao autenticar usuário:", error);
          throw new Error("Erro ao autenticar usuário.");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (typeof token.userName === 'string') {
        session.user.userName = token.userName;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.userName = user.userName;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
});