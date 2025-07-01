import NextAuth, { DefaultSession, Session } from "next-auth"
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    });

                    const data = await res.json();
                    console.log("data", data)

                    if (!res.ok || !data.access_token) {
                        throw new Error("Login failed");
                    }

                    // add token to callback 
                    return {
                        id: data.user.id,
                        user_name: data.user.user_name,
                        email: data.user.email,
                        avatar_url: data.user.avatar_url,
                        accessToken: data.access_token,
                    };
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    callbacks: {
        // add accessToken to token
        async jwt({ token, user, account, trigger, session }: { token: any; user?: any; account?: any; trigger?: string; session?: any }) {
            // Credentials login
            if (user?.accessToken) {
                token.accessToken = user.accessToken;
                token.user = user;
            }
            if (trigger === "update") {
                // console.log(session)
                if (session?.user.user_name) {
                    token.user.user_name = session?.user.user_name;
                }
                if (session?.user.avatar_url) {
                    token.user.avatar_url = session?.user.avatar_url;
                }
                
            }
            // Google login
            if (account?.provider === "google") {
                const res = await fetch("http://localhost:8080/api/v1/auth/google", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: token.email,
                        user_name: token.name,
                        auth_provider: account?.provider, // Google ID
                    }),
                });

                const data = await res.json();

                token.accessToken = data.access_token; // Gán JWT từ backend
            }

            return token;
        },
        // add accessToken to session
        async session({ session, token }: { session: any, token: any }) {
            session.accessToken = token.accessToken as string
            session.user!.accessToken = token.accessToken as string
            session.user!.avatar_url = token.user.avatar_url as string
            session.user!.user_name = token.user.user_name as string
            session.user!.email = token.user.email as string
            return session;
        },
    }

}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }