import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";


export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id : "credentials",
            name : "Credentials",
            credentials : {
                email : {label : "Email", type : "text"},
                password : {label : "Password", type : "password"}
            },
            async authorize(credentials:any):Promise<any> {
                await dbConnect();
                // Algorithm: 
                // 1. finding the user from the database
                // 2. if user not present and if user is not verified, throw error
                // 3. Check password -> if correct return user, else throw error.

                try {
                    const user = await UserModel.findOne({
                        $or : [
                            {username : credentials.identifier.username},
                            {email : credentials.identifier.email}
                        ]
                    })
                    if (!user) {
                        throw new Error("No user found with this email")
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify your account before logging in")
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("Incorrect Password")
                    }
                } catch (err : any) {
                    throw new Error(err);
                }
            },
        }),
    ],
    callbacks : {
        async jwt({ token, user }) {
            token._id = user._id?.toString();
            token.isAcceptingMessage =user.isAcceptingMessage;
            token.isVerified = user.isVerifed;
            token.username = user.username;
            return token
        },
        async session({ session, token }) {
            session.user._id = token._id;
            session.user.isVerifed = token.isVerified;
            session.user.isAcceptingMessage = token.isAcceptingMessage;
            session.user.username = token.username;
            return session
        },
    },
    pages : {
        signIn : '/sign-in'
    },
    secret : process.env.SECRET_KEY,
    session : {
        strategy : "jwt"
    },

}