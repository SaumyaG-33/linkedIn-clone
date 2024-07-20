'user server'

import { AddPostRequestBody } from "@/app/api/post/route";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server"

export default async function createPostAction(formData: FormData): Promise<void> {
  // Add your implementation here
  const user = await currentUser()
  if (!user) {
    throw new Error("You must be signed in to create a post")
  }
  const postInput   = formData.get("postInput") as string;
  const image = formData.get("image") as File;
  let imageUrl: string | undefined;;


  if (!postInput) {
    throw new Error("Post cannot be empty")
  }

  //define user 

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "" ,
  };
// website.come/api/posts -> 

  //upload image if it exists
  try {
    if(image.size > 0) {
      //upload image to cloudinary - this needs MS blob Storage 
      const body : AddPostRequestBody = {
        user: userDB,
        text: postInput,
        imageUrl: imageUrl,
      };
      await Post.create(body);
    } else {
      //1.create post without an image 
      const body : AddPostRequestBody= {
        user: userDB,
        text: postInput,
      };
      await Post.create(body);
    }
} catch (error) { 
  console.log("error creating your post: ", error);
}

  //create the post in the database 


  //revalidatePath '/' in the home page


}