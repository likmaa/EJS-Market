import { PrismaClient, Prisma } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Configuration Prisma optimisée pour Vercel (serverless)
const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: process.env.NODE_ENV === 'development' 
    ? (['query', 'error', 'warn'] as Prisma.LogLevel[])
    : (['error'] as Prisma.LogLevel[]),
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(prismaClientOptions)

// En production (Vercel), ne pas réutiliser l'instance globale pour éviter les problèmes de connexion
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

