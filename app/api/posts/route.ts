
import { auth } from "@clerk/nextjs/server";
import { stat } from "fs";
import connectDB from "mongodb/db";
import { IPostBase, Post } from "mongodb/models/post";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "types/user";


//typedef in the API level;

export interface AddPostRequestBody {
    user: IUser;
    text: string;
    imageUrl?: string | null;

}


export async function POST(request: Request) {
    auth().protect(); // protect with clerk 
    const { user, text, imageUrl } : AddPostRequestBody = await request.json();
    //passes in this information from body = and then acess the, 
    
    //prepare 
    try{
        await connectDB();
        const postData : IPostBase = {
            user,
            text,
            imageUrl: imageUrl || "",
        };
        const post = new Post(postData);
        return NextResponse.json({ message: "Post created successfully" });
    } catch(error) {
        return NextResponse.json(
            { error: "An error occured while creating the post" },
            {status: 500 }
        );
    }

}



export async function GET(request: Request) {
    try {
        await connectDB();
        //needs to connect with the DB before 
        const posts = await Post.getAllPosts();
    } catch (error) {
        return NextResponse.json(
        { error: "An error occured while fetching the post" },
        {status: 500 }
    );
    }
}
