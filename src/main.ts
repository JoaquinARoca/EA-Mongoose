import { createPost, findPostByTittle } from './services/post.js'
import { createStudent, deleteStudentByCode, findAllStudents, findStudentById, updateStudentLevelByCode, updateStudiesLevelByUserName} from './services/student.js'
import { createUser,findAllUsers, findPhoneByPostTittle, findUserPhoneByPostTitlePipeline} from './services/user.js'
import { startConnection } from './database.js';
import { IUser } from './models/user.js';
import { IPosts } from './models/post.js';
import { IStudent } from './models/student.js';


async function main() {
    await startConnection();
    
    const user1: IUser = {name:"Roc",lastName:"Roca",email:"Roc.Roca@exemple.com",phone:"+34-622-72-61-30"};
    const user2: IUser = {name:"Toni",lastName:"Rodriguez",email:"Toni.Rodriguez@exemple.com",phone:"+34-722-72-61-31"};
    const user3: IUser = {name:"Juan",lastName:"Gimenez",email:"Juan.Gimenez@exemple.com",phone:"+34-522-72-61-31"};

    //CREATE
    //Insert Users
    const user1Save = await createUser(user1);
    const user2Save = await createUser(user2);
    const user3Save = await createUser(user3);


    const student1 : Partial<IStudent> = {
        code:1,
        degree:"Eng. Swimming Pools",
        level:2
    }
    const student2 : Partial<IStudent> = {
        code:2,
        degree:"Mast. Swimming Pools",
        level:3
    }  
    const student3 : Partial<IStudent> = {
        code:3,
        degree:"Tec. Swimming Pools",
        level:3
    }
    console.log(student1,student2,student3);
    //Insert students
    const st1Save  = await createStudent(student1,user1);
    const st2Save  = await createStudent(student2,user2);
    const st3Save  = await createStudent(student3,user3);

    console.log(st1Save,st2Save,st3Save)
    const post1 : Partial<IPosts> = {
        code:1,
        title:"Efficient Swim",
        body:"you must consider that v=d/t then ....."
    }  
    const post2 : Partial<IPosts> = {
        code:2,
        title:"Better Swim",
        body:"you can't consider that v=d/t because ....."
    }
    //Insert students posts
    if(st1Save){
        const ps1Save  = await createPost(post1,st1Save);
    }
    if(st2Save){
        const ps2Save  = await createPost(post2,st2Save);
    }

    //READ
    //List students
    console.log("students: ", await findAllStudents());

    //find the phone number of the student who owns the post "Efficient Swim"
    console.log('phone: "'+ await findPhoneByPostTittle("Efficient Swim")+'"');

    //UPDATE
    //Actualiza el año de estudios del estudiante numero 2
    if(user2Save!=null){
        console.log(await updateStudentLevelByCode(2,5));
    }

    //DELETE
    //Elimina el estudiante Juan
    if(st3Save?.code!==undefined){
        console.log("Deleted: ",await deleteStudentByCode(st3Save?.code));
    }

    //Usando aggregation pipeline
    //READ find the phone number of the student who owns the post "Better Swim" with Aggregation Pipeline
    console.log(await findUserPhoneByPostTitlePipeline("Better Swim"));
    
    // UPDATE - Update the studies level of Roc using Aggregation Pipeline
    console.log(await updateStudiesLevelByUserName(user1.name,8) );
}   


main();