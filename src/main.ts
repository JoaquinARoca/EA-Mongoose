import {IUser,UserModel} from './models/user.js';
import {IStudent,StudentModel} from './models/student.js'
import { IPosts, PostModel } from './models/post.js';

import mongoose from 'mongoose';
mongoose.set('strictQuery', true); 
mongoose.connect('mongodb://localhost:27017/ea-mongoose').catch((error: Error) => console.log(error));

async function main() {
    const user1: IUser = {
        name:"Roc",
        lastName:"Roca",
        email:"Roc.Roca@exemple.com",
        phone:"+34-622-72-61-30"
    }
    const user2: IUser = {
        name:"Toni",
        lastName:"Rodriguez",
        email:"Toni.Rodriguez@exemple.com",
        phone:"+34-722-72-61-31"
    }
    const user3: IUser = {
        name:"Juan",
        lastName:"Gimenez",
        email:"Juan.Gimenez@exemple.com",
        phone:"+34-522-72-61-31"
    }


    const student1 : IStudent = {
        name:"Roc",
        email:"Roc.Roca@exemple.com",
        degree:"Eng. Swimming Pools",
        level:2
    }
    const student2 : IStudent = {
        name:"Toni",
        email:"Toni.Rodriguez@exemple.com",
        degree:"Mast. Swimming Pools",
        level:3
    }

    const post1 : IPosts = {
        author:"Roc",
        title:"Efficient Swim",
        body:"you must consider that v=d/t then ....."
    }
    const post2 : IPosts = {
        author:"Toni",
        title:"Better Swim",
        body:"you can't consider that v=d/t because ....."
    }

    //CREATE
    //Insert Users
    const user1Save = await new UserModel(user1).save();
    const user2Save = await new UserModel(user2).save();
    const user3Save = await new UserModel(user3).save();

    //Insert students
    const st1Save : IStudent = await (new StudentModel(student1)).save();
    const st2Save : IStudent = await (new StudentModel(student2)).save();

    //Insert students posts
    const ps1Save : IPosts = await(new PostModel(post1)).save();
    const ps2Save : IPosts = await(new PostModel(post2)).save();


    //READ
    //Listar usuarios
    async function listarUsuarios(){
        const users = await UserModel.find();
        console.log("users",users);
    }
    listarUsuarios();

    //find the phone number of the user who owns the post "Efficient Swim"
    const phone = await UserModel.findOne({ name: (await PostModel.findOne({ title: "Efficient Swim" }).exec())?.author }).exec()?.then(user => user?.phone || "No encontrado");
    console.log("phone", phone);

    //UPDATE
    //Actualiza el telefono de Toni
    const userUpdate = await UserModel.updateOne({name:"Toni"},{
        phone:"+34-655-34-63-85"
    });
    console.log(userUpdate);

    //DELETE
    //Elimina el usuario Juan
    const delUser = await UserModel.deleteOne({name:"Juan"});

    listarUsuarios();


    //Usando aggregation pipeline
    //READ Obtener el número de teléfono del autor de "Better Swim" con Aggregation Pipeline
    const phoneLookup = await PostModel.aggregate([
        { $match: { title: "Better Swim" } },  // Filtra por título
        { 
            $lookup: {  // Relaciona con la colección de usuarios
                from: "users",
                localField: "author",
                foreignField: "name",
                as: "userDetails"
            }
        },
        { $unwind: "$userDetails" }, // Desestructura el array de usuarios
        { $project: { _id: 0, phone: "$userDetails.phone" } } // Solo muestra el teléfono
    ]);
    console.log("Teléfono encontrado:", phoneLookup[0]?.phone || "No encontrado");
    
    // UPDATE - Cambiar el teléfono de "Toni" usando Aggregation Pipeline
    const updatedUser = await UserModel.aggregate([
        { $match: { name: "Toni" } },
        { $set: { phone: "+34-655-12-34-56" } }
    ]);
    console.log("Usuario actualizado:", updatedUser);
}   
main();