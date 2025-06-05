import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST (request : Request) {
    await dbConnect();

    try {
        const {username, email, password} = await request.json();

        //for existing verified user
        const existingVerifiedUserByUsername = await UserModel.findOne({
            username,
            isVerified : true
        })

        if (existingVerifiedUserByUsername) {
            return Response.json({
                success : false,
                message : "Username is already taken"
            },{
                status : 400
            })
        }

        //For existing but unverified user
        const existingUserByEmail = await UserModel.findOne({email})
        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success : false,
                    message : "User with this email already exists"
                },{
                    status : 400
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1);
                existingUserByEmail.verifyCodeExpiry = expiryDate;

                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password : hashedPassword,
                verifyCode,
                verifyCodeExpiry : expiryDate,
                isVerified : false,
                isAcceptingMessages : true,
                messages : []
            })

            await newUser.save();
        }

        //send verification email
        const emailResponse = sendVerificationEmail(
            email,
            username,
            verifyCode
        )



        if (!(await emailResponse).success) {
            return Response.json({
                success : false,
                message : "Error in sending verification email"
            },{
                status : 500
            })
        }

        return Response.json({
            success : true,
            message : "User registered Successfully, Please verify your account"
        },{
            status : 201
        })


    } catch (error) {
        console.log("Error in registering User");
        return Response.json({
            success : false,
            message : "Error in registering User"
        },{
            status : 500
        })
    }
}