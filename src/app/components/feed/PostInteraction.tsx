'use client'

import { switchLike } from "@/lib/actions"
import { useAuth } from "@clerk/nextjs"
import Image from "next/image"
import { useOptimistic, useState } from "react"

const PostInteraction = ({
    postId, 
    likes, 
    commentNumber,
}:{
    postId:number, 
    likes:string[], 
    commentNumber:number
}) => {

const {isLoaded, userId} = useAuth() // useAuth hook gebruik je bij 'use client'
const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false // .includes checkt in de array van userId's of de userId voorkomt. (Heeft de ingelogde gebruiker de post geliked true of false?)
})

const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState, // dit is de state uit useState({'de state die in dit gedeelte staat is de begin state en dat is ook de eerste likeState waarde'})
    (state, value) => { // state is ook een begin state en neemt dit als het ware over van likeState
        return {
            likeCount: state.isLiked ? state.likeCount -1 : state.likeCount +1,
            isLiked: !state.isLiked
        }
    }
)

const likeAction = async () =>{
    switchOptimisticLike('') // Het argument hier is leeg omdat met 'value'  hierboven in de useOptimistic() momenteel niets gedaan wordt. de functie hoeft hier alleen maar uitgevoerd te worden. 
    try {
        switchLike(postId)
        setLikeState((state) => ({likeCount: state.isLiked ? state.likeCount -1 : state.likeCount +1,
            isLiked: !state.isLiked}))
    } catch (err) {
        
    }
}

    //YT:4:50:36 HIER VERDER!!

  return (
     <div className='flex items-center justify-between text-sm font-light'>
            <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
                <form action={likeAction}>{/*Hier wordt de likeAction functie aangeroepen wanneer er op de button geklikt wordt.*/}
                <button>
                    <Image src={optimisticLike.isLiked ? '/liked.png' : '/like.png'} alt='' width='16' height='16' className='cursor-pointer'/>
                </button>    
                </form>
                    <span className='text-gray-300'>|</span>
                    <span className='text-gray-500'>{optimisticLike.likeCount}<span className='hidden md:inline'> Likes</span>
                </span>             
            </div>
            <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
                <Image src='/comment.png' alt='' width='16' height='16' className='cursor-pointer'/>
                <span className='text-gray-300'>|</span>
                <span className='text-gray-500'>
                    {commentNumber}<span className='hidden md:inline'> Comments</span>
                </span>             
            </div>
            
            <div className=''>
            <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
                <Image src='/share.png' alt='' width='16' height='16' className='cursor-pointer'/>
                <span className='text-gray-300'>|</span>
                <span className='text-gray-500'>
                    123<span className='hidden md:inline'> Shares</span>
                </span>             
            </div>
            </div>
        </div>
  )
}

export default PostInteraction