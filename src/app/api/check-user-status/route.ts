import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { UsernameValidation } from "@/schema/signUpSchema";
import { z } from "zod";

//Checking whether username has proper schema wrt zod
    const UsernameQuerySchema = z.object({
        username : UsernameValidation
    });

export async function GET(request : Request) {

    await dbConnect();

    try {
        //taking the entire url
        const {searchParams} = new URL(request.url);

        //taking required param from the url
        const queryParams = {
            username : searchParams.get('username')
        };

        //getting final result after parsing the queryparams using zod
        const result = UsernameQuerySchema.safeParse(queryParams);
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success : false,
                message : usernameErrors.length > 0 ? usernameErrors.join(", ") : 'Invalid query parameters'
            }, {
                status : 400
            })
        }

        const {username} = result.data;
        const existingVerfiedUser = await UserModel.findOne({
            username,
            isVerified : true
        })

        if (existingVerfiedUser) {
            return Response.json({
                success : true,
                isAcceptingMessages : existingVerfiedUser.isAcceptingMessages
            }, 
            {
                status : 200
            })
        } else {
            return Response.json({
                success : false,
                message : "User not found with given username"
            }, {
                status : 404
            })
        }
    } catch (error) {
        console.log('Error in checking status: ', error);
        return Response.json({
            success : false,
            message : 'Error in understanding status'
        },{
            status : 500
        })
    }
    
}