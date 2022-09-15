import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 20,
    },
    password:{
        type: String,
        required: true,
        min: 4,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: ""
    }
});

export default model("Users", userSchema);