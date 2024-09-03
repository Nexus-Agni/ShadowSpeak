import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import {z} from 'zod';
import { UsernameValidation } from "@/schema/signUpSchema";

//Checking whether username has proper schema wrt zod
const UsernameQuerySchema = z.object({
    username : UsernameValidation
});

export async function GET (request : Request) {
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

        //taking the username from the result
        const {username} = result.data;
        const existingVerfiedUser = await UserModel.findOne({
            username,
            isVerified : true
        });

        //if existing verifed user is present give success false message
        if (existingVerfiedUser) {
            return Response.json({
                success : false,
                message : "Username already taken"
            },{
                status : 409
            })
        }

        return Response.json({
            success : true,
            message : "Username is available"
        },{
            status : 200
        })

    } catch (error) {
        console.log('Error in checking unique username: ', error);
        return Response.json({
            success : false,
            message : 'Error in checking unique username'
        },{
            status : 500
        })
    }
}