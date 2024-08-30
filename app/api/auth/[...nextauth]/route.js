import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const users = [
          {
            id: 1,
            username: "John",
            password: "123",
            role: "Manager",
          },
          {
            id: 2,
            username: "Emily",
            password: "456",
          },
          {
            id: 3,
            username: "Tom",
            password: "789",
          },
        ];

        const user = users.find(
          (user) =>
            user.username === credentials.username &&
            user.password === credentials.password
        );

        if (user.role === undefined) {
          user.role = "user";
        }

        if (user) {
          console.log(`User found: ${JSON.stringify(user)}`);
          return user;
        } else {
          console.log("user not found");
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.role = token.role || "user";

      return session;
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,
};

const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
