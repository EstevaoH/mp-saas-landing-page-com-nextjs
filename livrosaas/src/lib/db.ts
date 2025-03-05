import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

declare global {
  var prisma: PrismaClient | undefined;
}

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

// Configuração do cliente LibSQL (Turso)
const libsql = createClient({
  url: "libsql://livrosaas-estevaoh.turso.io"!, // URL do banco de dados Turso
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDExMDUyNTMsImlkIjoiZjczYmU1NzctMWZjNC00MWEzLWE3ZWUtMTYwODA0YWQ0ZTZhIn0.OU3ozBBCimJbdlQ2I-EUpG7zRVKNn5IgjEecw1LmLHJucPEb3Fz93XF89m3tPir5d8Wxw1UE7qYmI4pc9s3NAA"!, // Token de autenticação do Turso
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