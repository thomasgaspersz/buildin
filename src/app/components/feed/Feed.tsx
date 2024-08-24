import { auth } from "@clerk/nextjs/server"
import Post from "./Post"
import prisma from "@/lib/client"

const Feed = async ({username}:{username?:string}) => {

  const {userId} = auth()

  let posts:any[] = []

  if(username){
    posts = await prisma.post.findMany({
      where:{
        user:{
          username:username
        }
      },
      include:{
        user: true,
        likes:{
          select:{
            userId:true
          }
        },
        _count:{
          select:{
            comments:true,
          },
        }      
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

 // de notitie TG555 in Stories.tsx betreft voor onderstaande 
  if(!username && userId){
    const following = await prisma.follower.findMany({
      where:{
        followerId:userId
      },
      select:{
        followingId:true,
      }
    })
       const followingsIds = following.map(f => f.followingId)
       const ids = [userId, ...followingsIds]
       //console.log(ids)

       posts = await prisma.post.findMany({
        where: {
          userId: {
            in: ids,
          },
        },
        include: {
          user: true,
          likes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

  
  //YT 4:35:40

  return (
    <div className='p-4 bg-white rounded-lg shadow-md flex-col gap-12'>
      {posts.length ? (posts.map(post => <Post key={post.id} post={post}/> )) : 'No posts found!'}       
    </div>
  )
}

export default Feed