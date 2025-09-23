import NextAuth, { AuthOptions, Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { email, jwt } from "zod";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import { signIn } from "next-auth/react";

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
					role: "USER" as UserRole,
				};
			},
		}),
		CredentialProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}

				const findUser = await prisma.user.findFirst({
					where: {
						email: credentials.email,
					},
				});

				if (!findUser) {
					return null;
				}

				const isPasswordValid = await compare(
					credentials.password,
					findUser.password
				);

				if (!isPasswordValid) {
					return null;
				}

				if (!findUser.verified) {
					return null;
				}

				return {
					id: findUser.id,
					email: findUser.email,
					name: findUser.fullName,
					role: findUser.role,
				};
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				if (account?.provider === "credentials") {
					return true;
				}

				if (!user.email) {
					return false;
				}

				const findUser = await prisma.user.findFirst({
					where: {
						OR: [
							{
								provider: account?.provider,
								providerId: account?.providerAccountId,
							},
							{ email: user.email },
						],
					},
				});

				if (findUser) {
					await prisma.user.update({
						where: {
							id: findUser.id,
						},
						data: {
							provider: account?.provider,
							providerId: account?.providerAccountId,
						},
					});

					return true;
				}

				await prisma.user.create({
					data: {
						email: user.email,
						fullName: user.name || "User #" + user.id,
						password: hashSync(user.id.toString(), 10),
						verified: new Date(),
						provider: account?.provider,
						providerId: account?.providerAccountId,
					},
				});

				return true;
			} catch (error) {
				console.log(error, "error [SIGHIN]");
				return false;
			}
		},
		async jwt({ token }: { token: JWT }) {
			if (!token.email) {
				return token;
			}

			const findUser = await prisma.user.findFirst({
				where: {
					email: token.email ?? undefined,
				},
			});

			if (findUser) {
				token.id = String(findUser.id);
				token.email = findUser.email;
				token.name = findUser.fullName;
				token.role = findUser.role;
			}

			return token;
		},
		session({ session, token }: { session: Session; token: JWT }) {
			if (session?.user) {
				session.user.id = token.id as string;
				session.user.role = token.role as UserRole;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
