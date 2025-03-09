import {Types, Schema,model } from "mongoose";
import { IStudent } from "./student.js";

//interfase for a TS object
export interface IPosts {
    code:number;
    student:Types.ObjectId;
    title:string;
    body:string;
}

//Post Schema
const postSchema = new Schema<IPosts>({
    code:{type:Number,required:true, unique:true},
    student:{type:Schema.Types.ObjectId,ref:"student"},
    title: { type: String, required: true },
    body:{type:String, required:true}
});

//Post Model
export const PostModel = model('Post',postSchema);