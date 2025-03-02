import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Configuração do cliente LibSQL (Turso)
const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL!, // URL do banco de dados Turso
  authToken: process.env.TURSO_AUTH_TOKEN!, // Token de autenticação do Turso
});

// Adaptador do Prisma para LibSQL
const adapter = new PrismaLibSQL(libsql);

// Criação do PrismaClient com o adaptador do Turso
const db = globalThis.prisma || new PrismaClient({ adapter });

// Evita a criação de múltiplas instâncias do PrismaClient em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

export default db;