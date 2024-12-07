import NextAuth from "next-auth"
import "next-auth/jwt"
import Cognito from "next-auth/providers/cognito"

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
      if (account) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        return {
          ...token,
          access_token: account.access_token || "",
          expires_at: account.expires_at || 0,
          refresh_token: account.refresh_token,
        }
      } else if (Date.now() < token.expires_at * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        return token
      }
      
      if (!token.refresh_token) throw new TypeError("Missing refresh_token")

      try {
        const wellKnownResponse = await fetch(process.env.AUTH_COGNITO_ISSUER + "/.well-known/openid-configuration")
        if(!wellKnownResponse.ok) throw new TypeError("error calling openid-configuration")

        const openIdConfig = await wellKnownResponse.json()

        const response = await fetch(openIdConfig.token_endpoint, {
          method: "POST",
          body: new URLSearchParams({
            client_id: process.env.AUTH_COGNITO_ID!,
            client_secret: process.env.AUTH_COGNITO_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token!,
          }),
        })

        const tokensOrError = await response.json()

        if (!response.ok) throw tokensOrError

        const newTokens = tokensOrError as {
          access_token: string
          expires_in: number
          refresh_token?: string
        }

        token.access_token = newTokens.access_token
        token.expires_at = Math.floor(
          Date.now() / 1000 + newTokens.expires_in
        )
        // Some providers only issue refresh tokens once, so preserve if we did not get a new one
        if (newTokens.refresh_token){
          token.refresh_token = newTokens.refresh_token
        }
          
        return token
      } catch (error) {
        console.error("Error refreshing access_token", error)
        // If we fail to refresh the token, return an error so we can handle it on the page
        token.error = "RefreshTokenError"
        return token
      }
    },
    session: async ({ session, token }) => {
      session.error = token.error
      if(session.access_token == "" || session.access_token == null) {
        session.access_token = token.access_token  
      }      
      return session
    },
    authorized: async ({ request, auth }) => {
      const pathName = request.nextUrl.pathname;
      if(pathName === '/api/auth/callback/cognito' || pathName === '/api/auth/signin') {
        return true;
      }

      if(auth?.error) {
        return false;
      }

      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
})

declare module "next-auth" {
  interface Session {
    access_token: string
    error?: "RefreshTokenError"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string
    expires_at: number
    refresh_token?: string
    error?: "RefreshTokenError"
  }
}