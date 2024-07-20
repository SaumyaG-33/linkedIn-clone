import { IUser } from "@/types/user";
import mongoose, {Schema, Document, models, Model} from "mongoose";


//client 
export interface ICommentBase{
    user: IUser;
    text: string;
}

//backend 
export interface IComment extends ICommentBase, Document {
    created: Date;
    updated: Date;
}

const commentSchema = new Schema<IComment>(
{
    user: {
        userId: { type: String, required: true },
        userImage: { type: String, required: true },
        firstName: { type: String, required: true },    
        lastName: { type: String}
    },

    text: { type: String, required: true },

    }

);


export const Comment = models.Comment || mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);