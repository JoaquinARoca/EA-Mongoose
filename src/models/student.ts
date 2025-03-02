import { Schema,model } from "mongoose";

//interfase for a TS object
export interface IStudent {
    name: string;
    email:string;
    degree:string;
    level:number;
}

//student schema
const studentSchema = new Schema<IStudent>({
    name:{type:String, required:true},
    email: { type: String, required: true },
    degree:{type:String, required:true},
    level:{type:Number, default:1}
});

//Student Model
export const StudentModel = model('Student',studentSchema);