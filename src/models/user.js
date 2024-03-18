import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: String,
    last_name: String,
        
    password: String,
       
    age: Number,
        
    email: {
        type: String,
        unique: true,
       
    },
})

export const userModel = model("users", userSchema)