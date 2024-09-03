import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import { getServerSession } from "next-auth";

export async function POST(request:Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user:User = session?.user as User; //TODO: Add User type.

    //checking if session or user is not present
    if (!session || !session.user) {
        console.log("Not authenticated");
        Response.json({
            success : false,
            message : "User is not authenticated"
        },{
            status : 401
        })
    }

    const userId = user._id;
    const {acceptMessages} = await request.json();

    try {
        //update message updating status
        const updatedUser = await UserModel.findByIdAndUpdate(userId,{
            isAcceptingMessages : acceptMessages
        },{
            new : true
        })
        
        if (!updatedUser) {
            console.log("Unable to find user to change message accepting status");
            Response.json({
                success : false,
                message : "Unable to find user to change message accepting status"
            },{
                status : 401
            })
        }

        return Response.json({
            success : true,
            updatedUser
        },{
            status : 200
        })
    } catch (error) {
        console.log("Error in updating message accepting status");
        Response.json({
            success : false,
            message : "Error in updating message accepting status"
        },{
            status : 500
        })
    }
}

export async function GET(request:Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user:User = session?.user as User; //TODO: Add User type.

    //checking if session or user is not present
    if (!session || !session.user) {
        console.log("Not authenticated");
        Response.json({
            success : false,
            message : "User is not authenticated"
        },{
            status : 401
        })
    }

    try {
        const foundUser = await UserModel.findById(user._id);
        if (!foundUser) {
            //User not found case
            console.log('User not found');
            return Response.json({
                success : false,
                message : "User not foundd"
            },{
                status : 404
            })
        }

        //return user's message acceptance status
        return Response.json({
            success : true,
            isAcceptingMessage : foundUser.isAcceptingMessages
        },{
            status : 200
        })
    } catch (error) {
        console.log("Error in retriving message accepting status");
        Response.json({
            success : false,
            message : "Error in retriving message accepting status"
        },{
            status : 500
        })
    }
}