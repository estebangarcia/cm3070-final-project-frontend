import NextAuth from "next-auth"
import Cognito from "next-auth/providers/cognito"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Cognito({
      authorization: {
        params: { scope: "openid email phone profile" }
      },
      profile(profile, tokens) {
        return {
          email: profile.email,
          name: profile.given_name + " " + profile.family_name,
          id: profile.sub,
          image: null,
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({token, trigger, session, account}) => {
      if(!("accessToken" in token) && account != null && "access_token" in account) {
        return { ...token, accessToken: account?.access_token }  
      }
      return token
    },
    session: async ({ session, token }) => {
      if(!("accessToken" in session) && ("accessToken" in token)) {
        (session as any).accessToken = token.accessToken
      }      
      return session
    },
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