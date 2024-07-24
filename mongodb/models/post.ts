
import mongoose, {Schema, Document, models, Model} from "mongoose";
import { Comment, IComment, ICommentBase } from "./comment";
import { IUser } from "types/user";


export interface IPostBase {
    user: IUser;
    text: string;   
    imageUrl: string;
    comments?: IComment[];
    likes?: string[];
}

export interface IPost extends IPostBase, Document {
    created: Date;
    updated: Date;
    createdAt: string;
}   

// defind doccument for each isntance of a post
interface IPostMethods{
    likePost(userID: string): Promise <void>;
    unlikePost(userID: string): Promise <void>;
    commentOnPost(comment: ICommentBase): Promise <void>;
    getAllComments(): Promise <IComment[]>;
    removePost(): Promise <void>;

}

interface IPostStatics{
    getAllPosts(): Promise <IPostDocument[]>;
}



export interface IPostDocument extends IPost, IPostMethods {} // one post
interface IPostModel extends Model<IPostDocument>, IPostStatics {} // all post 
        //fetch form mongose, each document has an ID, differnet type - object ID
        //post will have list of id comments 
        //comments = array of ID - which refernce the comments 

const PostSchema = new Schema<IPostDocument>(
    {
        user: {
            userId: { type: String, required: true },
            userImage: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String }
        },
        text: { type: String, required: true },
        imageUrl: { type: String },
        comments: { type: [Schema.Types.ObjectId], ref: "Comment", default: []}, 
        likes: [{ type: String }]
        }, 
         {
            timestamps: true,
        }
);  

//instance methods

//makes sure there is only one like per user 
PostSchema.methods.likePost = async function (userID: string) {
    try {
        await this.updateOne({ $addToSet: { likes: userID } });
    } catch (error) {
        console.log("error liking post: ", error);
    }
};
//does the oposite, pulls the id from the daatabase and array 
PostSchema.methods.unlikePost = async function (userID: string) {
    try {
        await this.updateOne({ $pull: { likes: userID } });
    } catch (error) {
        console.log("error unliking post: ", error);
    }
};

PostSchema.methods.removePost = async function () {
    try {
        await this.model("Post").deleteOne({ _id: this._id });
    } catch (error) {
        console.log("error removing post: ", error);
    }
};

PostSchema.methods.commentOnPost = async function (commentToAdd: ICommentBase) {
    try {
        const comment = await Comment.create(commentToAdd);
       
        if (!this.comments) {
            this.comments = []; // Initialize if undefined
        }
        this.comments.push(comment._id);
        console.log("pushed comment");
        await this.save();
    } catch (error) {
        console.log("error commenting on post: ", error);
    }
};

PostSchema.methods.getAllComments = async function () {
    try {
        await this.populate({
            path: "comments",
            options: { sort: { createdAt: -1 } }, //sort comments by date
        });
        return this.comments;
    } catch (error) {
        console.log("error getting comments: ", error);
    }
};

PostSchema.statics.getAllPosts = async function () {
    try {
        //find = gets all the posts 
       //sort = sort bynewest post first
       //expand 
       const posts = await this.find()
       .sort({ createdAt: -1 })
       .populate({
            path: "comments",
            options: { sort: { createdAt: -1 } },
        })
        .lean(); //converts mongose to javascript object 

        return posts.map((post: IPostDocument) => ({
            ...post,
            _id: (post._id as string).toString(),
            comments: post.comments?.map((comment: IComment) => ({
                ...comment,
                _id: (comment._id as unknown as string).toString(),
            })),
        }));
    } catch (error) {
        console.log("error getting all posts: ", error);
    }
}  

export const Post = models.Post as unknown as IPostModel || 
mongoose.model<IPostDocument, IPostModel>("Post", PostSchema); //export the model (initializing)