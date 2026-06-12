import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { dbConnect } from '@/lib/db'
import { User } from '@/lib/models'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        await dbConnect()

        const user = await User.findOne({ email: credentials.email })

        if (
          !user ||
          !user.password ||
          !(await bcrypt.compare(credentials.password as string, user.password))
        ) {
          throw new Error('Invalid email or password')
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      if (account?.provider === 'google') {
        await dbConnect()
        let dbUser = await User.findOne({ email: token.email })

        if (!dbUser) {
          dbUser = new User({
            email: token.email,
            name: token.name,
            image: token.picture,
            role: 'user',
            accounts: [
              {
                provider: 'google',
                providerAccountId: account.providerAccountId,
                type: account.type,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
              },
            ],
          })
          await dbUser.save()
        }
        token.id = dbUser._id.toString()
        token.role = dbUser.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
        (session.user as any).role = token.role
      }
      return session
    },
  },
})
