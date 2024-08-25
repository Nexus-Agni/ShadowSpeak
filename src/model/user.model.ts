import mongoose,{Schema, Document} from "mongoose";

export interface Message extends Document {
    content : string; //string with small "s" comes from typescript
    createdAt : Date;
}

const MessageSchema:Schema<Message> = new mongoose.Schema({
    content : {
        type : String, //String with "S" comes from Mongoose
        required: true
    },
    createdAt : {
        type : Date,
        required: true,
        default : Date.now 
    }
})

export interface User extends Document {
    username : string;
    email : string;
    password : string;
    verifyCode : string;
    verifyCodeExpiry : Date;
    isVerified : Boolean;
    isAcceptingMessages : Boolean;
    messages : Message[];
}

const UserSchema : Schema<User> = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Username is required"],
        trim : true,
        unique : true
    }, 
    email : {
        type : String,
        required : [true, "Please use a valid email address"],
        
    }
})