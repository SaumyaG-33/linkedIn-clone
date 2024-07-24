"user client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IPostDocument } from "mongodb/models/post";
import ReactTimeago from "react-timeago";

function CommentFeed ({ post }: { post: IPostDocument}) {
    const { user } = useUser();
    const isAuthor = user?.id === post.user.userId;
    
    return (
    <div className="space-y-2 mt-3">
        {post.comments?.map((comment) => 
        (
            <div key={comment._id} className="flex space-x-1">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.user.userImage} />
                    <AvatarFallback>
                        {comment.user.firstName?.charAt(0)}
                        {comment.user.lastName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                
                <div className="bg-gray-100 px-4 py-2 rounded-md w-full sm:w-auto md:min-w-[300px]">
                    <div className="flex justify-between">
                        <p className="font-semibold">
                            {comment.user.firstName} {comment.user.lastName}
                        </p>
                        <p className="text-xs text-gray-400">
                            @{comment.user.firstName}
                            {comment.user.lastName}-{comment.user.userId.toString().slice(-4)}
                            </p>
                    </div>
                 <div>
                        <p className="text-xs text-gray-400">
                           <ReactTimeago date={new Date(comment.created)} 
                           />
                       </p>
                       </div>

                       <p className="mt-3 text-sm">{comment.text}</p>
                </div>
            </div>
        ))}
    </div>
    );
}

export default CommentFeed;