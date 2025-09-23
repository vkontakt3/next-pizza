import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const user = await getServerSession();

		if (!user) {
			return NextResponse.json(
				{ message: "Вы не авторизованы" },
				{ status: 401 }
			);
		}

		const data = await prisma.user.findUnique({
			where: {
				email: user.user.email,
			},
			select: {
				fullName: true,
				email: true,
			},
		});

		return NextResponse.json(data);
	} catch (error) {
		console.error("[USER_GET]", error);
		return NextResponse.json(
			{ message: "Произошла ошибка [USER_GET]" },
			{ status: 500 }
		);
	}
}
