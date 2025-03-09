import { IStudent,StudentModel } from "../models/student.js";
import { insertPostOfUserById } from "./student.js" 
import { IPosts,PostModel } from "../models/post.js";

export async function createPost(post:Partial<IPosts>, student:IStudent):Promise<IPosts|null> {
    //find Student by Code
    const studentFound = await StudentModel.findOne({code: student.code });
    if (!studentFound)
        return null;

    post.student = studentFound._id;

    //insert
    const newPost = new PostModel(post)
    const insertPost = await newPost.save()
    if(!insertPost)
        return null

    await insertPostOfUserById(insertPost.student,insertPost._id)
    return insertPost;
}

export async function findPostByTittle(title:string) {
    return await PostModel.findOne({title:title})    
}