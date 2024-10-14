import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request : Request , {params} :{params : {messageid : string}}) {
    const messageId = params.messageid;
    await dbConnect();

    const session = await getServerSession(authOptions);
    const _user : User = session?.user as User;

    if(!session || !_user) {
        return Response.json({
            success : false,
            message : "User not authenticated"
        }, {
            status : 401
        })
    }

    try {
        const updateResult = await UserModel.updateOne(
            {_id : _user._id}, 
            {$pull : {messages : {_id : messageId}}}
        );

        if (updateResult.modifiedCount===0) {
            return Response.json({
                success : false,
                message : "Message not found or already deleted"
            }, {
                status : 404
            })
        }

        return Response.json({
            success : true,
            message : "Message deleted successfully"
        }, {
            status : 200
        })
    } catch (error) {
        console.log("Error in deleting message", error);
        return Response.json({
            success : false,
            message : "Error in deleting message"
        }, {
            status : 500
        })
    }

}