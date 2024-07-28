
import mongoose, {Schema, Document, models} from "mongoose";
import { IUser } from "types/user";


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
    created:{ type: Date, default: Date.now }, 
    updated: { type: Date, default: Date.now }


    }

);


export const Comment = 
models.Comment || mongoose.model<IComment>("Comment", commentSchema);