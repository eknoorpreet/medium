import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from 'next-auth/react';
import { verifyPassword } from '../../../lib/auth';
import { connectDB } from '../../../lib/connectDB';
import User from '../../../server/models/user';

export const authOptions = {
  session: { jwt: true, maxAge: 1 * 60 * 60 },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('Invalid credentials, login failed!');
        }
        const isValidPassword = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error('Invalid credentials, login failed!');
        }
        //return obj (will be encoded in the JWT)
        return {
          name: user.name,
          userId: user.id,
          email: user.email,
          bio: user.bio,
          avatar: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      // session.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        // token.id = user.id;
      }
      return token;
    },
  },
  secret: 'supersecret_dont_share',
  jwt: { secret: 'supersecret_dont_share', encryption: true },
};

export default NextAuth(authOptions);
