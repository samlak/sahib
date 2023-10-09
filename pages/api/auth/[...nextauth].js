import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../model/Users";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await connectMongo().catch((error) => {
          throw new Error("Connection Failed...!");
        });

        // check user existance
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user with the email found. Sign up to continue.");
        } else if (!result.password) {
          throw new Error("You already signup with Google. Continue with Google or create a new account.");
        }

        // compare()
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }

        return result;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        await connectMongo().catch((error) => {
          throw new Error("Connection Failed...!");
        });
        const { name, given_name, family_name, email } = profile;
        const checkIfUserExist = await Users.findOne({ email });

        if(!checkIfUserExist) {
          Users.create({ name, firstName: given_name, lastName: family_name,  email, password : null}, async function(error, data){
            if(error) return false;
          })
        }
      }
      return true;
    },
  }
});
