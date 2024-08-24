import prisma from '@/app/lib/client'
import Image from 'next/image'
import CommentList from './CommentList'


const Comments = async ({postId}:{postId:number}) => {

    const comments = await prisma.comment.findMany({
        where: {
            postId,
        },
        include: {
           user:true 
        }
    })
  return (
    <div className='mb-4'>
        {/*WRITE*/}
        <CommentList comments={comments} postId={postId} />
    </div>
  )
}

export default Comments