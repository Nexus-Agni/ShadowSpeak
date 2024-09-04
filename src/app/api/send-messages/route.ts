import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { Message } from "@/model/user.model";

export async function POST(request:Request) {
    await dbConnect();

    const {username, content} = await request.json();

    try {
        const user = await UserModel.findOne({username}).exec();

        //check if user is present
        if (!user) {
            console.log('User not found');
            return Response.json({
                success : false,
                message : "User not found"
            },{
                status : 404
            })
        }

        //check if user is accepting messages. 
        if (!user.isAcceptingMessages) {
            console.log('User is not accepting messages');
            return Response.json({
                success : false,
                message : "User is not accepting messages"
            },{
                status : 403
            }) 
        }

        const newMessage = {content, createdAt : new Date() };

        //push the message to the messages array
        user.messages.push(newMessage as Message);
        await user.save();

        return Response.json({
            success : true,
            message : "Message sent successfully"
        },{
            status : 201
        })

    } catch (error) {
        console.log('Error adding messages');
        return Response.json({
            success : false,
            message : "Error adding messages"
        },{
            status : 500
        })
    }
}