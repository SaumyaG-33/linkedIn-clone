
import { auth, currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { cp, stat } from "fs";
import connectDB from "mongodb/db";
import { Post } from "mongodb/models/post";
import { deleteAppClientCache } from "next/dist/server/lib/render-server";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    {params} : {params: {post_id: string} }
) {
    await connectDB();

    try{
        const post = await Post.findById(params.post_id);
        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json(
            { error: "An error occured while fetching the post" },
            { status: 500 }
        );
    }
}
export interface DeletePostRequestBody {
    userId: string;
}

export async function DELETE(
    request: Request,
    {params} : {params: {post_id: string} }
) {
    auth().protect();

    await connectDB();

    const { userId }: DeletePostRequestBody = await request.json();

    try {
        const post = await Post.findById(params.post_id);
        if(!post) {
            return NextResponse.json({error: "Post not found" }, {status: 404 });
        }

        if (post.user.userId !== userId) {
            return NextResponse.json(
                { error: "You are not authorized to delete this post" },
                { status: 403 }
            );
        }
        await post.removePost();
        return NextResponse.json({ message: "Post deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "An error occured while deleting the post" },
            { status: 500 }
        );
    }
}