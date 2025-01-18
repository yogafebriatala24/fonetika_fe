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
          console.log(data);

          if (data?.data?.user?.email && data?.data?.token) {
            return {
              id: data.data.user.email,
              email: data.data.user.email,
              name: data.data.user.name,
              token: data.data.token,
              image_url: data.data.user.image_url,
              phone: data.data.user.phone,
              uuid: data.data.user.uuid,
              roles: data.data.user.roles,
              sampul_url: data.data.user.sampul_url,
              bio: data.data.user.bio,
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
        token.image_url = user.image_url;
        token.phone = user.phone;
        token.uuid = user.uuid;
        token.roles = user.roles;
        token.sampul_url = user.sampul_url;
        token.bio = user.bio;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.token = token.token;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image_url = token.image_url;
        session.user.phone = token.phone;
        session.user.uuid = token.uuid;
        session.user.roles = token.roles;
        session.user.sampul_url = token.sampul_url;
        session.user.bio = token.bio;
      }
      return session;
    },
  },
};
