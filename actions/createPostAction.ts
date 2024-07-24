'use server'

import { BlobServiceClient } from "@azure/storage-blob";
import { currentUser } from "@clerk/nextjs/server"
import { AddPostRequestBody } from "app/api/posts/route";
import { randomUUID } from "crypto";
import generateSASToken, { containerName } from "lib/generateSASToken";
import { Post } from "mongodb/models/post";
import { revalidatePath } from "next/cache";
import { IUser } from "types/user";

export default async function createPostAction(formData: FormData): Promise<void> {
  // Add your implementation here
  const user = await currentUser()
  if (!user) {
    throw new Error("You must be signed in to create a post")
  }
  const postInput   = formData.get("postInput") as string;
  const image = formData.get("image") as File;
  let image_url:string | undefined = undefined;

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
// website.come/api/posts

  //upload image if it exists
  try {
    if(image.size > 0) {
      //upload image to cloudinary - this needs MS blob Storage 
      console.log("uploading image to Azure Blob storgae", image);

      const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
      const sasToken = await generateSASToken();

      const blobServiceClient = new BlobServiceClient (
        `https://${accountName}.blob.core.windows.net?${sasToken}`
      );

      const containerClient = blobServiceClient.getContainerClient(containerName);
      const timestamp = new Date().getTime();

      const file_name = `${randomUUID()}_${timestamp}.png`;
      const blockBlobClient = containerClient.getBlockBlobClient(file_name);

      const imageBuffer = await image.arrayBuffer();
      const res = await blockBlobClient.uploadData(imageBuffer);

      image_url = res._response.request.url;

      console.log("image uploaded successfully", image_url);

      const body : AddPostRequestBody = {
        user: userDB,
        text: postInput,
        imageUrl: image_url,
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
  revalidatePath("/");
}