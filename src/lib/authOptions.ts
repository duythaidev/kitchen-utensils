import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

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
                    const res = await fetch(`${process.env.BACKEND_API}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    })

                    const data = await res.json()
                    // console.log("data", data)
                    if (!res.ok || !data.access_token) {
                        return { error: data.message || "Login failed" } as any;
                    }

                    // add token to callback 
                    return {
                        id: data.user.id,
                        user_name: data.user.user_name,
                        email: data.user.email,
                        avatar_url: data.user.avatar_url,
                        accessToken: data.access_token,
                    }
                } catch (error) {
                    console.log("Login error:", error)
                    return null
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        // add accessToken to token
        signIn({ user, account, profile, email, credentials }: any) {
            if (user?.error) {
                throw new Error(user.error); 
            }
            return true;
        },        
        async jwt({ token, user, account, trigger, session }: any) {
            // Credentials login
            if (account?.provider === "credentials" && user) {
                token.accessToken = user.accessToken
                token.user = {
                    email: user.email,
                    user_name: user.user_name,
                    avatar_url: user.avatar_url,
                    role: user.role || "user", // Default role if not provided
                }
            }

            // Google login
            if (account?.provider === "google") {
                const res = await fetch(`${process.env.BACKEND_API}/auth/google`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: token.email,
                        user_name: token.name,
                        avatar_url: token.picture,
                        auth_provider: account?.provider, // Google
                    }),
                })

                const data = await res.json()
                token.accessToken = data.access_token // Gán JWT từ backend trả về

                token.user = {
                    email: data.user.email,
                    user_name: data.user.user_name,
                    avatar_url: data.user.avatar_url,
                    role: data.user.role || "user", // Default role if not provided
                }
            }

            // khi client side update info -> cập nhật token
            if (trigger === "update" && session?.user) {
                token.user = {
                    ...token.user,
                    user_name: session.user.user_name,
                    avatar_url: session.user.avatar_url,
                }
            }
            return token
        },
        // add accessToken to session
        async session({ session, token }: any) {
            return {
                ...session,
                accessToken: token.accessToken,
                user: {
                    ...session.user,
                    ...token.user,
                    accessToken: token.accessToken,
                },
            }
        },
        async redirect({ url, baseUrl }: any) {
            return baseUrl;
        },
    }
}
