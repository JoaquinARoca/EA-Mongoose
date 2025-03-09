import { ObjectId, Schema, model } from 'mongoose';

// 1. Create an interface representing a TS object.
export interface IUser {
  name: string;
  lastName:string;
  email: string;
  phone?: string;
}

// 2. Create a Schema corresponding to the document in MongoDB.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true},
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  phone: {type:String, default:"0"}
});

// 3. Create a Model.
export const UserModel = model('User', userSchema);