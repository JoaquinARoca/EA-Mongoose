import { Schema,model } from "mongoose";

//interfase for a TS object
export interface IPosts {
    author: string;
    title:string;
    body:string;
}

//Student Schema
const postSchema = new Schema<IPosts>({
    author:{type:String, required:true},
    title: { type: String, required: true },
    body:{type:String, required:true}
});

//Student Model
export const PostModel = model('Post',postSchema);