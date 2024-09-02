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


                try {
                    const user = UserModel.findOne({
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

                } catch (err : any) {
                    throw new Error(err);
                }
            },
        }),
    ]
}