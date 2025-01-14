import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      name: string;
      image: string;
      phone: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    token: string;
    name: string;
    email: string;
    image: string;
    phone: string;
  }

  interface JWT {
    token: string;
    user: {
      name: string;
      email: string;
      image: string;
      phone: string;
    };
  }
}
