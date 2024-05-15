import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from "next-auth/providers/credentials"


import EmailProvider from 'next-auth/providers/email';
import NextAuth, {  DefaultSession } from 'next-auth';
import prisma from '@/prisma/index';
import { html, text } from '@/config/email-templates/signin';
import { emailConfig, sendMail } from '@/lib/server/mail';
import { createPaymentAccount, getPayment } from '@/prisma/services/customer';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        const customerPayment = await getPayment(user.email);
        session.user.userId = user.id;

        if (customerPayment) {
          session.user.subscription = customerPayment.subscriptionType;
        }
      }

      return session;
    },
    jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id
        token.image = profile.avatar_url || profile.picture
      }
      return token
    },
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  debug: !(process.env.NODE_ENV === 'production'),
  events: {
    signIn: async ({ user, isNewUser }) => {
      const customerPayment = await getPayment(user.email);

      if (isNewUser || customerPayment === null || user.createdAt === null) {
        await Promise.all([createPaymentAccount(user.email, user.id)]);
      }
    },
  },
  providers: [
    
  ],
  secret: process.env.NEXTAUTH_SECRET || null,
  session: {
    jwt: true,
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
};
