import NextAuth, { DefaultSession } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

const handler = NextAuth(
  {
    // Configure one or more authentication providers
    providers: [
      SpotifyProvider({
        clientId: process.env.SPOTIFY_CLIENT_ID!,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
        authorization: {
          params: {
            scope: "streaming user-read-email user-read-private"
          }
        }
      }),
      // ...add more providers here
    ],
    callbacks: {
      async jwt({token, account}) {
        if (account) {
          token = Object.assign({}, token, { access_token: account.access_token });
        }
        return token
      },
      async session({session, token}) {
      if(session) {
        session = Object.assign({}, session, {access_token: token.access_token})
        console.log(session);
        }
      return session
      }
  
    },
  
  }
);
export { handler as GET, handler as POST }

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token: string;
  }
}