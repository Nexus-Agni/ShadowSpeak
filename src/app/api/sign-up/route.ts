import dbConnect from "@/lib/dbConnect";
import VerificationEmail from "../../../../email/verificationEmail";
import UserModel from "@/model/user.model";
import bcrypt from "bcrypt";

export async function POST (request : Request) {
    await dbConnect();

    try {
        const {username, email, verifyCode} = await request.json();

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