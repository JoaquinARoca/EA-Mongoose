import { Types, Schema,model, ObjectId } from "mongoose";
import { IUser } from "./user.js";

//interfase for a TS object
export interface IStudent {
    code:number;
    user:Types.ObjectId;
    degree:string;
    level:number;
    post?:ObjectId[];
}

//student schema
const studentSchema = new Schema<IStudent>({
    user:{type:Schema.Types.ObjectId,ref: "user"},
    code:{type:Number,required:true, unique:true},
    degree:{type:String, required:true},
    level:{type:Number, default:1},
    post:[{type:Schema.Types.ObjectId,ref:"post"}]
});

//Student Model
export const StudentModel = model('Student',studentSchema);