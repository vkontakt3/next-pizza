import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient();
};

// Объявляем глобальную переменную
declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Используем уже созданный клиент или создаём новый
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();


// В режиме разработки сохраняем клиента в globalThis, чтобы не создавать заново
if (process.env.NODE_ENV !== "production") {
	globalThis.prismaGlobal = prisma;
}
