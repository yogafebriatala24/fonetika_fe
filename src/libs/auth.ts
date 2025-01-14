import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email atau password tidak boleh kosong.");
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            const errorData = await res.json();

            throw new Error(errorData.message || "Login gagal.");
          }

          const data = await res.json();

          if (data?.data?.user?.email && data?.data?.token) {
            return {
              id: data.data.user.email,
              email: data.data.user.email,
              name: data.data.user.name,
              token: data.data.token,
              image: data.data.user.image,
              phone: data.data.user.phone,
            };
          }

          return null;
        } catch (error) {
          throw new Error("Terjadi kesalahan dalam proses login.");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.phone = user.phone;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.token = token.token;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
};
