import NextAuth, { DefaultSession, Session } from "next-auth"
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { authOptions } from "@/lib/authOptions";


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }