import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

export async function GET(request:Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const _user:User = session?.user as User; //TODO: Add User type.

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

    const userId = new mongoose.Types.ObjectId(_user._id);

    //aggregation pipeline for fetching the messages
    try {
        const user = await UserModel.aggregate([
            {$match : {_id : userId}},
            {$unwind : 'messages'},
            {$sort : {'messages.createdAt': -1}},
            { $group: { _id: '$_id', messages: { $push: '$messages' } } },
        ]).exec();

        return Response.json({
            messages : user[0].message
        },{
            status : 200
        })
    } catch (error) {
        return Response.json({
            success : true,
            message : "Error in getting messages. Internal server error."
        },{
            status : 500
        })
    }

}