import 'next-auth';

declare module 'next-auth' {
  interface User {
    userName?: string;
  }

  interface Session {
    user: User & {
      userName?: string;
    };
  }
}