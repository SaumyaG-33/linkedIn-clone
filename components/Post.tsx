"use client"

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Trash2, TrashIcon } from "lucide-react";
import { IPostDocument } from "mongodb/models/post";
import ReactTimeago from "react-timeago";
import { Button } from "./ui/button";
import deletePostAction from "actions/deletePostAction";
import { Badge } from "./ui/badge";
import Image from "next/image";
import PostOptions from "./PostOptions";
import { error } from "console";
import { toast } from "sonner";



function Post ({ post }: {post: IPostDocument }) {
    const { user } = useUser();

    const isAuthor = user?.id === post.user.userId; 

    return (
    <div className="bg-white rounded-md border"> 
        <div className="p-4 flex space-x-2">
                <div className="flex items-center space-x-2">
                    <Avatar className="relative w-12 h-12 rounded-full overflow-hidden">
                        <AvatarImage src={post.user.userImage} className="w-full h-full object-cover" />
                        <AvatarFallback className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-200">
                            {user?.firstName?.charAt(0)}
                            {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div >

                <div className="flex justify-between flex-1"> 
              <div>
                    <p className="font-semibold">
                        {post.user.firstName} {post.user.lastName}{" "}
                        {isAuthor && (
                        <Badge className="ml-2" variant ="secondary">
                            Author
                        </Badge>
                        )}
                    </p>
              

                    <p className="text-xs text-gray-400">
                        @{post.user.firstName}
                         {post.user.lastName}-{post.user.userId.toString().slice(-4)}
                    </p>

                    <p className="text-xs text-gray-400">
                       <ReactTimeago date={new Date(post.createdAt) } />
                    </p>
                    </div>


                    {isAuthor && (
                        <Button 
                            variant="outline"
                                onClick ={() => {
                                    if (typeof post._id === 'string' || typeof post._id === 'number') {
                                        const promise = deletePostAction(post._id.toString());
                                        toast.promise(promise, {
                                            success: "Post deleted",
                                            error: "Error deleting post",
                                            loading: "Deleting post...",
                                        });
                                        //toast notification based on the promise above
                                    } else {
                                        // Handle the case where post._id is not a string or number
                                        console.error('post._id is not a string or number');
                                    }
                                }}
                            >
                               
                            <Trash2 />
                        </Button>
                    )}
                </div>    
        </div>

        <div className="p-4 pb-2 mt-2"> 
            <p>
                {post.text}
            </p>
            {post.imageUrl && (
                <Image
                src={post.imageUrl}
                alt="post image"
                width={500}
                height={500}
                className="w-full mx-auto"
                />
                
            )}
        </div>


        <div>
            <PostOptions
                post={post}/>
        
        </div>
        </div>

      
  );
}

export default Post;