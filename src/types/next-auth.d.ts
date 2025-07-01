
import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string
    user?: {
      user_name?: string | null | undefined;
      email?: string | null | undefined;
      avatar_url?: string | null | undefined;
      accessToken?: string | null | undefined;
    }
  }
}
