import NextAuth, { Session } from "next-auth"
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

interface ISession extends Session {
    accessToken?: string,
    refreshToken?: string; // refreshToken có thể là undefined nếu user đã đồng ý trước đó
}
import { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
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
                // Add logic here to look up the user from the credentials supplied
                console.log("credentials", credentials)
                const { email, password } = credentials as { email: string, password: string };
                return {
                    id: "1",
                    name: "John Doe",
                    email: email,
                }
                // If you return null then an error will be displayed advising the user to check their details.
                return null

                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
    // callbacks: {
    //     async jwt({ token, account }) {
    //         // account chỉ có lần đầu login (not on every request)
    //         if (account) {
    //             token.accessToken = account.access_token;
    //             token.refreshToken = account.refresh_token; // có thể undefined nếu user đã đồng ý trước đó
    //             token.expires_at = account.expires_at;
    //         }
    //         return token;
    //     },
    //     async session({ session, token }: { session: ISession, token: JWT }) {
    //         // gắn access token vào session
    //         session.accessToken = token.accessToken as string;
    //         session.refreshToken = token.refreshToken as string; // có thể undefined nếu user đã đồng ý trước đó
    //         return session;
    //     },
    // },
    // session: {
    //     strategy: "jwt", // nếu bạn đang dùng database thì nên để 'database'
    // },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }