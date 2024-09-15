'use client'

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image"
import { useRouter } from "next/navigation" // met wel de navigation zijn en niet de root.
import { useOptimistic, useState } from "react";
//YT 4:53:18

type CommentWithUser = Comment &  {user:User}

const CommentList = ({
    comments, 
    postId
}:{
    comments :CommentWithUser[]; 
    postId:number}) => {
  
const {user} = useUser()        // server side hook van Clerk voor React - auth() is voor serverside
const [commentState, setCommentState] = useState(comments)
const [desc, setDesc] = useState('')

const router = useRouter()

const add = async () =>{
    if(!user || !desc) return
    
    try {
         const createdComment = await addComment(postId, desc)
         addOptimisticComment({
            id: Math.random(),
            description: desc,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            userId: user.id,
            postId:postId,
            user: {
                id:user.id,
                username: 'Sending pleas wait...',
                avatar: user?.imageUrl || "/noAvatar.png",
                cover: '',
                description: '',
                aboutUs:'',
                name: '',
                surname: '',
                city: '',
                work: '',
                business:'',
                school: '',
                website: '',
                email:'',
                createdAt: new Date(Date.now()),
            },


         })
        setCommentState(prev => [createdComment, ...prev])
        router.refresh()//deze zorgt nu voor het refreshen van de huidige pagina waardoor je de comments counts ziet verhogen. (methode 2 in de eigen documentatie)

    } catch (err) {
        
    }


}

const[optimisticComments, addOptimisticComment] = useOptimistic(commentState, (state, value: CommentWithUser)=>[value, ...state])

return (
    <>
    {user&& <div className='flex items-center gap-4  overflow-hidden'>
           <Image 
                src={user.imageUrl || '/noAvatar'} // user?.imageUrl  ipv user?.imageUrl omdat dit uit Clerk komt. 
                alt='' 
                width={32} 
                height={32} 
                className='w-8 h-8 rounded-full object-cover overflow-hidden'
            />
            <form action={add} className='flex flex-1 items-center justify-between bg-slate-100 px-6 py-2 rounded-xl text-sm w-full'>
                <input 
                    type='text text-sm font-light' 
                    placeholder='Write a comment...' 
                    className='flex-1 bg-transparent outline-none' 
                    onChange={e=>setDesc(e.target.value)}
                />
                <Image 
                    src='/emoji.png' 
                    alt='' 
                    width={20} 
                    height={20} 
                    className='cursor-pointer w-5 h-5'
                />
            </form>
        </div>}
        {/*COMMENTS*/}  
        <div className=''>
            {/*COMMENT*/}
            {optimisticComments.map(comment => (
                <div className='flex gap-4 justify-between mt-6' key={comment.id}>
                {/*AVATAR*/}
                <Image 
                src={comment.user.avatar || '/noAvatar.png'}
                alt='' 
                width={40} 
                height={40} 
                className='w-10 h-10 rounded-full object-cover overflow-hidden'
            />
                {/*DESCRIPTION*/}
                <div className='flex flex-col gap-2 flex-1'>
                    <span className='font-md'>{comment.user.name && comment.user.surname ? comment.user.name + ' ' + comment.user.surname : comment.user.username}</span>
                    <p className='font-light'>
                    {comment.description}
                    </p>
                    <div className='flex items-center gap-8 text-gray-500 mt-2'>
                        <div className='flex items-center bg-slate-100 rounded-xl p-2 gap-4'>
                        <Image src='/like.png' alt='' width={12} height={12} className='w-3 h-3 cursor-pointer'></Image>
                        <span className='text-gray-300'>|</span>
                        <span className='text-gray-500'>
                        123 Likes</span>   
                        </div>
                    </div>
                </div>
                {/*ICON*/}
                <Image src='/more.png' alt='' width={16} height={16} className='w-4 h-4 cursor-pointer'></Image>
            </div>

            ))}

        </div>
        </>
  )
}

export default CommentList