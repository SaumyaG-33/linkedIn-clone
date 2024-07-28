"use client";

import { SignedIn, useUser } from "@clerk/nextjs";
import { MessageCircle, Repeat2, Send, ThumbsUpIcon } from "lucide-react";
import { IPostDocument } from "mongodb/models/post";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "lib/utils";
import { LikePostRequestBody } from "app/api/posts/[post_id]/like/route";
import { UnLikePostRequestBody } from "app/api/posts/[post_id]/unlike/route";
import CommentFeed from "./CommentFeed";
import CommentForm from "./CommentForm";

function PostOptions({ post }: {post: IPostDocument}) {
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const { user } = useUser();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post?.likes);

    useEffect(() => {
        if (user?.id && post?.likes && post.likes.includes(user.id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [post, user]);


    const likeOrUnlikePost = async () => {
        if (!user?.id) {
            throw new Error("You must be signed in to like a post");
        }
        const originalLiked = liked;
        const originalLikes = likes;

        const newLikes = liked
        ? likes?.filter((like) => like !== user.id)
        : [...(likes ?? []), user.id]; 
        
        const body: LikePostRequestBody | UnLikePostRequestBody = {
            userId: user.id,
        };
        setLiked(!liked);
        setLikes(newLikes);

        const response = await fetch(`/api/posts/${post._id}/${liked ? "unlike": "like"}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );

        if(!response.ok) {
            setLiked(originalLiked);
            setLikes(originalLikes);
            const errorResponse = await response.text();
           throw new Error("Error liking or unliking post"); 
        };

        const fetchLikesResponse = await fetch(`/api/posts/${post._id}/like`);
        if(!fetchLikesResponse.ok) {
            setLiked(originalLiked);
            setLikes(originalLikes);
            throw new Error("Error fetching likes");
        }
        const newLikesData = await fetchLikesResponse.json();
        setLikes(newLikesData);
    };
        

    return (
        <div>
            <div className="flex justify-between pl-4 pt-4">
                {likes && likes.length > 0 && (
                    <p className="text-xs text-gray-400 cursor-pointer hover:underline">
                        {likes.length} {likes.length === 1 ? 'like' : 'likes'}
                    </p>
                )}
            </div>

            <div className="flex justify-between pl-4">
                {post?.comments && post.comments.length > 0 && (
                    <p
                        onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                        className="text-xs text-gray-400 cursor-pointer 
                        hover:underline"  >
                        {post.comments.length} comments
                    </p>
                )}
            </div>

            <div className="flex p-2 justify-between px-2 border-t">
                <Button
                variant="ghost"
                className="postButton"
                    onClick={likeOrUnlikePost}
            >    
                <ThumbsUpIcon className={cn("mr-1", liked && "text-blue-500 fill-[#4881c2]")}
                />
                Like
                </Button>

                <Button
                variant="ghost"
                className="postButton"
                onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            >    
                <MessageCircle
                  className={cn("mr-1", isCommentsOpen && "text-gray-600 fill-gray-600")} />
                    Comment
                </Button>

                <Button
                variant="ghost"
                className="postButton"
            >    
                <Repeat2
                 className={cn("mr-1")} 
                />
                Repost
                </Button>

                <Button
                variant="ghost"
                className="postButton"
            >    
                <Send
                 className={cn("mr-1")} 
                />
                Send
                </Button>
            </div>
            {isCommentsOpen && (
                <div className="p-4">
                    <SignedIn> 
                { <CommentForm postId={String(post._id) ?? ""}/> }
                    </SignedIn>
                    <CommentFeed post={post}/> 
                  
                    </div>
                )}
        </div>

    );
}

export default PostOptions;
