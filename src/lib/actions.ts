'use server'

import { auth } from "@clerk/nextjs/server"
import prisma from "./client"
import { z } from "zod"
import { Schoolbell } from "next/font/google"
import { revalidatePath } from "next/cache"

export const switchFollow = async (userId: string) => {
    const {userId:currentUserId} = auth()

    if(!currentUserId) {
        throw new Error('User is not authenticated!')
    
    }

    try {
        const existingFollow  = await prisma.follower.findFirst({
            where:{
                followerId: currentUserId,
                followingId: userId,
            }
        })

        if (existingFollow){
            await prisma.follower.delete({
                where:{
                    id: existingFollow.id,
                }
            })
        }else{
            const existingFollowRequest = await prisma.followRequest.findFirst({
                where:{
                    senderId:currentUserId,
                    receiverId: userId,
                },
            })
            if(existingFollowRequest){
                await prisma.followRequest.delete({
                    where:{
                        id:existingFollowRequest.id
                    },
                })
            }else{
                await prisma.followRequest.create({
                    data:{
                     senderId:currentUserId,
                     receiverId: userId,
                    },
                })
            }
        }

    } catch (err) {
        console.log(err)
        throw new Error('Somthing went wrong!')
    }
}

export const switchBlock = async (userId: string) => {

        const {userId:currentUserId} = auth()

        if(!currentUserId) {
            throw new Error('User is not Authenticated!')
        }

        try {
            const existingBlock = await prisma.block.findFirst({
                where: {
                    blockerId: currentUserId,
                    blockedId: userId,
                }
            })

            if(existingBlock) {
                await prisma.block.delete({
                    where:{
                        id: existingBlock.id
                    }
                })
            }else{
                await prisma.block.create({
                    data: {
                        blockerId: currentUserId,
                        blockedId: userId
                    }
                })
            }
            
        } catch (err) {
            console.log(err)
            throw new Error('Somthing went wrong!')
        }
}

export const acceptFollowRequest = async (userId:string) => {
    const {userId:currentUserId} = auth()

    if(!currentUserId) {
        throw new Error('User is not Authenticated!')
    }

    {/*Onderstaande checkt of er al een openstaande follow request is*/}
    try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
        where:{
            senderId: userId,
            receiverId: currentUserId,
        }
    })
        {/*Wanneer er al een follow request is dan moet deze van de followRequest tabel verwijdert worden.*/}
        if(existingFollowRequest){
            await prisma.followRequest.delete({
                where:{
                    id:existingFollowRequest.id,
                }
            })
        }
        {/*Na bovenstaande check kan de follow request toegevoegd worden aan de follower tabel
          In de follower tabel staan de volgende kolomen: 
          
          followerId   |   following id
        --------------------------------
        currentUser id |   userId
            
        ** De currentUser is de ingelogde user. 
        ** de userId is van de userpagina waar je opkijkt, deze komt als prop binnen via de profilepage uit de dynamic params
           Zie onderstaande: (Dit was in eerst instatie omgedraaid)     
        */}
        await prisma.follower.create({
            data:{
                followerId: userId,
                followingId: currentUserId, 

                // IF: de followerId (de sender en dus >> userId?)
                // THEN: de receiver is follwingId
                // We gaan nu van bovenstaande uit.
                
                // Original order version: 
                // followerId: userId (sender),
                // followingId: currentUserId (receiver), (Accepter or decliner)

                // Eerst het schema aangepast.

            }
        })
    } catch (err) {
        console.log(err)
        throw new Error('Something went wrong')
    }
}

export const declineFollowRequest = async (userId:string) => {
    const {userId:currentUserId} = auth()

    if(!currentUserId) {
        throw new Error('User is not Authenticated!')
    }

    try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
        where:{
            senderId: userId,
            receiverId: currentUserId,
        }
    })

        if(existingFollowRequest){
            await prisma.followRequest.delete({
                where:{
                    id:existingFollowRequest.id,
                }
            })
        }
    } catch (err) {
        console.log(err)
        throw new Error('Something went wrong')
    }
}

export const updateProfile = async (
    prevState:{success: boolean, error: boolean}, 
    payload: {formData:FormData, cover:string}
) => {
    const {formData, cover} = payload
    const fields = Object.fromEntries(formData)
    
    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([_,value])=>value !== '')
    )



    console.log(fields)

    //Zod controleert hier of de data uit het formulier aan onderstaande voldoen voor een correcte input naar de database.
    const Profile =z.object({
        cover:z.string().optional(),
        name:z.string().max(60).optional(),
        surname:z.string().max(60).optional(),
        description:z.string().max(255).optional(),
        city:z.string().max(60).optional(),
        school:z.string().max(60).optional(),
        work:z.string().max(60).optional(),//job category
        business:z.string().max(60).optional(),
        aboutUs:z.string().max(60).optional(),
        website:z.string().max(60).optional(),
    })

    const validatedFields = Profile.safeParse({ cover, ...filteredFields })

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {success:false, error:true}
    }

    const {userId} = auth()

    if(!userId){
        return {success:false, error:true}
    }

    try {
        await prisma.user.update({
            where:{
                id:userId
            },
            data:validatedFields.data
        })
        return {success:true, error:false}
    } catch (err) {
        console.log(err)
        return {success:false, error:true}
    }
}

export const switchLike = async (postId:number) => {

const {userId} = auth()

if(!userId) throw new Error('User is not authenticated')

try {
        const existingLike = await prisma.like.findFirst({
            where:{
                postId,
                userId
            }
        })
        if(existingLike){
            await prisma.like.delete({
                where:{
                    id:existingLike.id
                }
            })
        }else{
            await prisma.like.create({
                data:{
                    postId, 
                    userId
                }
            })
        }
    } catch (err) {
        console.log(err)
        throw new Error('Something went wrong!')
    }
}

export const addComment = async(postId:number, description:string) => {
    const {userId} = auth() // auth() van clerk gebruik je in een serverside. Bij clientside kun je de useUser hook van Clerk gebruiken. 
    
    if(!userId) throw new Error('User is not authenticated')
        try {
            const createdComment = await prisma.comment.create({
                data:{
                    description,
                    userId,
                    postId,
                },
                include:{
                    user: true,
                }
            })
            return createdComment
        } catch (err) {
            console.log(err)
            throw new Error('Something went wrong!')   
        }

}

export const addPost = async (formData:FormData, img:string) => {

{/*YT VERDER 5:15*/}
 const desc = formData.get('desc') as string
 
 const Desc = z.string().min(1).max(255)

 const validateDesc = Desc.safeParse(desc)

 if(!validateDesc.success){
    //TODO SEND ERROR
    console.log('description is not valid')
    return
 }

 const {userId} = auth()
 
 if(!userId) throw new Error('User is not authenticated')
 
    try {
    await prisma.post.create({
        data:{
            desc: validateDesc.data,
            userId,
            img,
        }
    })
    revalidatePath('/')
 } catch (err) {
    console.log(err)
 }
}

export const addStory = async (img: string) => {
    const { userId } = auth();
  
    if (!userId) throw new Error("User is not authenticated!");
  
    try {
      const existingStory = await prisma.story.findFirst({
        where: {
          userId,
        },
      });
  
      if (existingStory) {
        await prisma.story.delete({
          where: {
            id: existingStory.id,
          },
        });
      }
      const createdStory = await prisma.story.create({
        data: {
          userId,
          img,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
        include: {
          user: true,
        },
      });
  
      return createdStory;
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deletePost = async (postId: number) => {
    const { userId } = auth();
  
    if (!userId) throw new Error("User is not authenticated!");
  
    try {
      await prisma.post.delete({
        where: {
          id: postId,
          userId,
        },
      });
      revalidatePath("/")
    } catch (err) {
      console.log(err);
    }
  };