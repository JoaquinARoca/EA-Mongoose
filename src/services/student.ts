import { Types } from "mongoose";
import { IStudent,StudentModel } from "../models/student.js";
import { IUser,UserModel } from "../models/user.js";

export async function createStudent(student:Partial<IStudent>, user:IUser):Promise<IStudent|null> {
    //find User by email
    const userFound = await UserModel.findOne({ email: user.email });
    if (!userFound)
        return null;

    student.user = userFound._id;
    console.log(user);
    console.log(userFound._id);
    //insert
    const newStudent = new StudentModel(student)
    const insertStudent = await newStudent.save()
    if(!insertStudent)
        return null

    return insertStudent;
}
export async function findStudentById(id:string):Promise<IStudent|null> {
    return await StudentModel.findById(id)
}
export async function findStudentByCode(code:number) :Promise<IStudent|null> {
    return await StudentModel.findOne({code:code});
}

export async function findAllStudents() {
    return await StudentModel.find();
}

export async function updateStudentLevelByCode(code:number, newLevel: number): Promise<IStudent|null> {
    return await StudentModel.findOneAndUpdate({code:code},{level:newLevel});
}

export async function insertPostOfUserById(studentId:Types.ObjectId,postId:Types.ObjectId):Promise<void|null> {
    return await StudentModel.findByIdAndUpdate(studentId,{$addToSet:{post:postId}});
}

export async function deleteStudentByCode(code:number): Promise<IStudent | null> {
    return await StudentModel.findOneAndDelete({code:code})
}

export async function updateStudiesLevelByUserName(userName: string, newLevel: number): Promise<void> {
    // Buscar el usuario por nombre
    const user = await UserModel.findOne({ name: userName });
    if (!user) {
        console.log(`Usuario con nombre "${userName}" no encontrado`);
        return;
    }

    // Usar Aggregation Pipeline para actualizar el nivel de estudios del estudiante asociado
    const result = await StudentModel.updateOne(
        { user: user._id },  // Filtrar por el usuario encontrado
        [
            { $set: { level: newLevel } } // Actualizar el nivel de estudios
        ]
    );

    if (result.modifiedCount > 0) {
        console.log(`Nivel de estudios actualizado a ${newLevel} para el usuario "${userName}"`);
    } else {
        console.log(`No se encontró un estudiante asociado al usuario "${userName}"`);
    }
}
