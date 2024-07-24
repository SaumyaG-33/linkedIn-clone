import { currentUser } from '@clerk/nextjs/server';
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { IPostDocument } from 'mongodb/models/post';

async function UserInformation({ posts }: {posts: IPostDocument[]}) {
    const user = await currentUser();
    const firstName = user?.firstName;
    const lastName = user?.lastName;

    const userPosts = posts?.filter((post) => post.user.userId === user?.id); 

    const userComments = posts?.flatMap(
        (post) => post?.comments?.filter((comment)=> 
            comment.user.userId === user?.id) || []
    );


    return (
        <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg boarder py-4" >
        <Avatar className="relative w-16 h-16 rounded-full overflow-hidden">
            {user?.id ? (
                <AvatarImage src={user?.imageUrl} />
            ) : (
                <AvatarImage src = "https://github.com/shadcn.png" />
            )}
        <AvatarImage src="user?.imageUrl || https://github.com/shadcn.png" />
        <AvatarFallback>
            {firstName?.charAt(0)} 
       
            {lastName?.charAt(0)}
            </AvatarFallback>
      </Avatar>

      <SignedIn>
        <div className="text-center">
        <p className='font-semibold'>
            {firstName} 
            {lastName}
            </p>

            <p className='text-xs'>
                @{firstName}
                {lastName} - {user?.id?.slice(-4)}
                </p>
            </div>
        </SignedIn>  


    <SignedOut>
        <div className="text-center space-y-2">
            <p className="font-semibold">You are not signed in</p>
            
            <Button asChild className="bg-#0b63c4  text-white">
                <SignInButton> Sign in </SignInButton> 
            </Button>
            </div>
    </SignedOut>  
    <hr className='w-full boarder-gray-200 my-5'/>

    <SignedIn>  

        <div> 
            <div className="flex justify-between w-full px-4 text-sm">
                <p className="font-semibold text-gray-400">Comments</p>
                <p className=" text-blue-500 ml-8">{userComments?.length}</p>
            </div>
            
            <div className="flex justify-between w-full px-4 text-sm">
                <p className=" font-semibold text-gray-400">Posts</p>
                <p className=" text-blue-500 ml-8">{userPosts?.length}</p>
            </div>
        </div>
    </SignedIn>

    <SignedOut>
    <div className="flex justify-between w-full px-4 text-sm">
                <p className="font-semibold text-center text-gray-400">Sign in now to interact with your feed </p>
               
            </div>
    </SignedOut>

      </div>
    );
}

export default UserInformation;