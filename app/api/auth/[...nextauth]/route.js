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
        try {
          const res = await fetch("http://localhost:5001/users/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Invalid credentials");
          }
          const user = await res.json();
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
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
      console.log(token, "jwt");
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.role = token.role || "user";
      console.log(session, "session");
      return session;
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,
};

const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
