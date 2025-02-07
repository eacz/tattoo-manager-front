import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import { AuthResponse } from './modules/auth/interfaces'
import tattooManagerApi from './lib/axios'
import { cookies } from 'next/headers'
import { renewToken } from './actions'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/signup',
  },
  session: {
    maxAge: 7200,
    updateAge: 3400 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log({ auth })

      //const isLoggedIn = !!auth?.user
      //const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      //if (isOnDashboard) {
      //  if (isLoggedIn) return true
      //  return false // Redirect unauthenticated users to login page
      //} else if (isLoggedIn) {
      //  return Response.redirect(new URL('/dashboard', nextUrl))
      //}
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.data = user
        return token
      } else {
        try {
          console.log('renew')

          const { token: newToken, user } = await renewToken()
          if (newToken && user) {
            token.user = user
            return token
          } else {
            return null
          }
        } catch (error) {
          return null
        }
      }
    },

    session({ session, token, user }) {
      session.user = token.data as any
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) {
          return null
        }

        const { email, password } = parsedCredentials.data

        const { data } = await tattooManagerApi.post<AuthResponse>('/auth/login', { email, password })
        const { token, user } = data
        cookies().set('token', token)
        if (!user) return null

        return { ...user, token } as any
      },
    }),
  ],
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
