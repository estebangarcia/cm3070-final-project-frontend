import NextAuth from "next-auth"
import Cognito from "next-auth/providers/cognito"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Cognito({
      authorization: {
        params: { scope: "openid email phone" }
      }
    })
  ],
  callbacks: {
    
    authorized: async ({ request, auth }) => {
      const pathName = request.nextUrl.pathname;
      if(pathName === '/api/auth/callback/cognito' || pathName === '/api/auth/signin') {
        return true;
      }

      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
})