import mongoose,{Schema, Document, Mongoose} from "mongoose";

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
        required : [true, "Email is required"],
        trim : true,
        unique : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"]
    },
    password : {
        type : String,
        required : [true, "Password is a mandatory field"],
        trim : true
    },
    verifyCode : {
        type : String,
        required : [true, "Verify code is required"],
        trim : true
    },
    verifyCodeExpiry : {
        type : Date,
        required : [true, "Verify Code expiry is required"]
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAcceptingMessages : {
        type : Boolean,
        default : false
    },
    messages : [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel;   