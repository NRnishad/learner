import mongoose,{Schema,Document} from "mongoose";
import { Category } from "../../../domain/entities/Category";

interface CategoryDocument extends Category,Document{}

const CategorySchema = new mongoose.Schema<CategoryDocument>({
    name:{type:String,required:true,unique:true },
    description:{type:String,default:""},
    isActive:{type:Boolean,default:true},
},{timestamps:true}
);
export const CategoryModel = mongoose.model<CategoryDocument>("Category",CategorySchema);
