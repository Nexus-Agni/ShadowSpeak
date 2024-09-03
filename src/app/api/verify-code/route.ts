import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

export async function POST(request:Request) {
    await dbConnect();

    try {
        const {username, code} = await request.json();
        //decoding the uri component
        const decodedUsername = decodeURIComponent(username);
        
        //querying db for the user
        const user = await UserModel.findOne({
            username : decodedUsername
        })
        
        //if user is not present with this username -> throw error
        if (!user) {
            console.log('User with this username is not present');
            return Response.json({
                success : false,
                message : "User with this username is not present"
            },{
                status : 404
            })
        }

        const isCodeValid = (user.verifyCode === code);
        const isCodeNotExpired = (new Date(user.verifyCodeExpiry) > new Date());

        if (isCodeValid && isCodeNotExpired) {
            //update user's verification status
            user.isVerified = true;
            await user.save();
            return Response.json({
                success : true,
                message : "User verified successfully"
            },{
                status : 200
            })
        } else if (!isCodeNotExpired) {
            console.log('Verification code expired. Please sign up again to get a new code');
            return Response.json({
                success : false,
                message : "Verification code expired. Please sign up again to get a new code"
            },{
                status : 400
            })
        } else {
            console.log('Invalid Verification code');
            // console.log('Code in db: ', user.verifyCode);
            // console.log('Code we are providing : ', code);
            
            return Response.json({
                success : false,
                message : "Invalid Verification code"
            },{
                status : 400
            })
        }

    } catch (error) {
        console.log('Error in verifying user');
        return Response.json({
            success : false,
            message : "Error in verifying user"
        },{
            status : 500
        })
    }
}