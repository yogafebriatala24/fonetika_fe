import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      name: string;
      image_url: string;
      phone: string;
      email: string;
      username: string;
      roles: string;
      sampul_url: string;
      bio: string;
    } & DefaultSession["user"];
  }

  interface User {
    token: string;
    name: string;
    email: string;
    image_url: string;
    phone: string;
    username: string;
    roles: string;
    sampul_url: string;
    bio: string;
  }

  interface JWT {
    token: string;
    user: {
      name: string;
      email: string;
      image_url: string;
      phone: string;
      username: string;
      roles: string;
      sampul_url: string;
      bio: string;
    };
  }
}
