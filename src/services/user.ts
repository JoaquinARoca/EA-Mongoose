import { IUser,UserModel } from "../models/user.js";
import { StudentModel} from "../models/student.js";
import { PostModel } from "../models/post.js";
import { Types } from "mongoose";


// Insert User
export async function createUser(user:Partial<IUser>): Promise<IUser|null> {
    const newUser = new UserModel(user);
    return await newUser.save()
}

// Find User by _id
export async function findUserById(id: string): Promise<IUser|null> {
    return await UserModel.findById(id);
}

// Find User by email
export async function findUserByEmail(email: string): Promise<IUser|null> {
    return await UserModel.findOne({email: email});
}

// Delete User by _id
export async function deleteUserById(id: string): Promise<IUser|null> {
    return await UserModel.findByIdAndDelete(id);
}

// Find All Users
export async function findAllUsers(): Promise<IUser[]> {
    return await UserModel.find();
}

//find User phone by post tittle
export async function findPhoneByPostTittle(title:string): Promise<string|null> {
    const post = await PostModel.findOne({title:title});
    if(!post) return null;

    const student = await StudentModel.findById(post.student);
    if(!student) return null;

    const user = await UserModel.findById(student.user);
    if (!user) return null;

    return user.phone || null;
}


export async function findUserPhoneByPostTitlePipeline(title: string): Promise<string | null> {
    const result = await PostModel.aggregate([
        {
            $match: { title: title } // Filtrar por título del post
        },
        {
            $lookup: {
                from: "students", // Relación con StudentModel
                localField: "student",
                foreignField: "_id",
                as: "studentData"
            }
        },
        { $unwind: "$studentData" }, // Convertir array en objeto
        {
            $lookup: {
                from: "users", // Relación con UserModel
                localField: "studentData.user",
                foreignField: "_id",
                as: "userData"
            }
        },
        { $unwind: "$userData" }, // Convertir array en objeto
        {
            $project: {
                _id: 0, // No mostrar _id
                phone: "$userData.phone" // Obtener solo el teléfono
            }
        }
    ]);

    return result.length > 0 ? result[0].phone : null; // Retorna el teléfono o null si no hay coincidencias
}