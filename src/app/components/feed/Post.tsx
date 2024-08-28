import Image from "next/image"
import Comments from "./Comments"
import { Post as PostType, User } from "@prisma/client"
import PostInteraction from "./PostInteraction"
import PostInfo from "./PostInfo"
import { auth } from "@clerk/nextjs/server"

type FeedPostType = PostType & {user: User} & {
  likes: [{userId:string}]
} & {
  _count:{comments:number}
}

const Post = ({post}:{post:FeedPostType}) => {
  const {userId} = auth()
  return (
    <div className='flex flex-col gap-4 overflow-hidden'>
        {/*USER*/}
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Image src={post.user.avatar || '/noAvatar.png'} alt='' width={48} height={48} className='w-12 h-12 rounded-full object-cover'/>
                <span className='font-medium'>{
                    (post.user.name && post.user.surname) ? post.user.name  + ' ' + post.user.surname : post.user.username
                }</span>   
            </div>
            {userId === post.user.id &&<PostInfo postId={post.id}/>}
        </div>
        {/*DESCRIPTION*/}
        {post.img && <div className='w-full min-h-96 relative'>
        <Image src={post.img} alt='' fill className='rounded-md object-cover'/>
        </div>}
        <p>{post.desc}</p>

        {/*//YT:4:40:34 VERDER*/}
        {/*INTERACTION*/}
        <PostInteraction postId={post.id} likes={post.likes.map((like)=> like.userId)} commentNumber={post._count.comments} />
        <Comments postId={post.id}/>
    </div>
  )
}

export default Post

