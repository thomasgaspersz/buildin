
import Feed from "@/app/components/feed/Feed"
import LeftMenu from "@/app/components/leftMenu/LeftMenu"
import RightMenu from "@/app/components/rightMenu/RightMenu"
import prisma from "@/app/lib/client"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import { notFound } from "next/navigation"


const ProfilePage = async ({params}:{params:{username:string}}) => {

  const username = params.username

  const user = await prisma.user.findFirst({
    where:{
      username, // >> username: username
    },
    include:{
        _count:{
          select:{
            followers: true,
            followings:true,
            posts:true,
          }
        }
    }
  })
  
  if (!user) return notFound()
  
  const {userId: currentUserId} = auth()

  let isBlocked;

  if(currentUserId){
    const res = await prisma.block.findFirst({
      where:{
        blockerId: user.id,
        blockedId: currentUserId,
      }
    })
    if(res) isBlocked = true
  }
  else{
    isBlocked = false
  }

  if (isBlocked) return notFound()

  return (
    <div className='flex gap-6 pt-6'>
    {/*LEFT MENU*/}
    <div className='hidden xl:block w-[20%]'><LeftMenu type='home'/></div>
    {/*CENTER*/}
      <div className='w-full lg:w-[70%] xl:w-[50%]'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col'>{/* bg-slate-50 rounded-md shadow-md?? */}
            <div className='w-full h-96 relative'>
              <Image src={user.cover || '/noCover.png'} alt='' fill className='object-cover rounded-md shadow-md'/>
              <Image src={user.avatar || '/noAvatar.png'} alt='' width={160} height={160} className='h-40 object-cover rounded-xl absolute  left-5 m-auto -bottom-5 ring-4 ring-white shadow-md'/>
            </div>
            <div className='flex px-4 pb-4 justify-between'>
              <div className=''>
            {/*START MID*/}
            <h1 className='mt-10 mb-2 text-xl font-light'>{user.name && user.surname ? user.name + ' ' + user.surname : user.username}</h1>
            <div className='flex gap-12'>
              <div className='flex flex-col'>
                <span className='font-light'>{user._count.posts}</span>
                <span className='text-sm font-light'>Post</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-light'>{user._count.followers}</span>
                <span className='text-sm font-light'>Followers</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-light'>{user._count.followings}</span>
                <span className='text-sm font-light'>Following</span>
              </div>
              </div>{/*END MID*/}
              </div>
              <div className='flex-1'>
              {/*START MID*/}
              {user.aboutUs && <div className='flex flex-col'>
                <span className='mt-10 mb-2 pl-2 text-xl font-light'>{user.business ? user.business : 'About Us'}</span>
                <span className='text-xs pl-2 font-light'>{user.aboutUs}</span>
              </div>}
            {/*END MID*/}
              </div>
            </div>
          </div>
          <Feed username={user.username}/>
        </div>
      </div>
    {/*RIGHT MENU*/}
    <div className='hidden lg:block w-[30%]'>
        <RightMenu user={user}/>
    </div>
  </div>
  )
  
}

export default ProfilePage