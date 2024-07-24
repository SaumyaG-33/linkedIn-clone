"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useRef } from "react";
import { AvatarFallback } from "./ui/avatar";
import { revalidatePath } from "next/cache";
import createCommentAction from "actions/createCommentAction";
import { toast } from "sonner";

function CommentForm({postId}: {postId: string}) {
    const { user } = useUser();
    const ref = useRef<HTMLFormElement>(null);

    const createCommentActionWithPostId = createCommentAction.bind(null, postId);
        
    const handleCommentAction = async (formData: FormData): Promise<void> => { 
        const formDataCopy = formData;
        ref.current?.reset();

        if(!user?.id) {
            throw new Error("You must be signed in to comment");
        }

        try {
            //server aciton
            await createCommentActionWithPostId(formDataCopy);
            revalidatePath("/");
        } catch(error) {
            console.log("error creating your comment: ", error);
        }
       
    };

    return (
    <form
        ref={ref}
        action={(formData) => {
            const promise = handleCommentAction(formData);
            toast.promise(promise, {
                loading: "Creating your comment...",
                success: "Comment created",
                error: "Error creating your comment",
            });
        }}
             className="flex items-center space-x-1"
    >
    <Avatar className=" rounded flex w-8 h-8">
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
        </AvatarFallback>

        <div className="flex flex-1 bg-white border rouned-full px-3 py-2">
            <input
            type="text"
            name="commentInput"
            placeholder="Write a comment..."
            className="flex-1 outline-none bg-transparent"/>

            <button type="submit" hidden > 
                Comment 
                </button>
        </div>
    </Avatar>
 </form>
);
}

export default CommentForm;