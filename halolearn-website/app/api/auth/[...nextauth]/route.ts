import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

function cleanEnvValue(value?: string | null) {
  return value?.replace(/^"|"$/g, '').replace(/\\n+$/g, '').replace(/\\r+$/g, '').trim();
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: cleanEnvValue(process.env.GOOGLE_CLIENT_ID) ?? "",
      clientSecret: cleanEnvValue(process.env.GOOGLE_CLIENT_SECRET) ?? "",
    }),
  ],
  secret: cleanEnvValue(process.env.NEXTAUTH_SECRET) ?? "fallback-secret",
  pages: {
    signIn: "/auth/signin",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
