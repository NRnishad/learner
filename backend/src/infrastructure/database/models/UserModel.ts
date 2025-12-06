import mongoose,{Schema,Document} from "mongoose";
import {User} from "../../../domain/entities/User";

interface UserDocument extends User, Document{}

const UserShema = new Schema<UserDocument>(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        role:{type:String,enum:['student','instructor','admin'],default:'student'},
        isVerified:{type:Boolean,default:false},
        profilePicture:{type:String,default:''},
    },
    {
        timestamps:true
    }

);

export const UserModel = mongoose.model<UserDocument>('User',UserShema) 
