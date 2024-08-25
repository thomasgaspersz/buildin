import prisma from "@/lib/client"
import { auth } from "@clerk/nextjs/server"
import { User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import UserInfoCardInteraction from "./UserInfoCardInteraction"
import UpdateUser from "./updateUser"

const UserInfoCard = async ({user}:{user:User}) => {
  const createdAtDate = new Date(user.createdAt)
  const formattedDate = createdAtDate.toLocaleDateString('nl', {
    year:'numeric', 
    month: 'long',
    day:'numeric'
  })

  let isUserBlocked = false
  let isFollowing = false
  let isFollowingSent = false


  const {userId:currentUserId} = auth()

  if(currentUserId){
    const blockRes = await prisma.block.findFirst({
      where:{
        blockerId: currentUserId,
        blockedId: user.id,
      }
    })
    
    blockRes ? isUserBlocked = true : isUserBlocked = false
    const followRes = await prisma.follower.findFirst({
      where:{
        followerId: currentUserId,
        followingId: user.id,
      }
    })

    followRes ? isFollowing = true : isFollowing = false
        const followReqRes = await prisma.followRequest.findFirst({
      where:{
        senderId: currentUserId,
        receiverId: user.id,
      }
    })

    followReqRes ? isFollowingSent = true : isFollowingSent = false
  }

  return (
    <div className='p-4 bg-white rounded-lg shadow-md  text-sm flex flex-col gap-4'>
      {/*TOP*/}
      <div className='flex justify-between items-center font-medium'>
        <span className='text-gray-500'>User information</span>
        {currentUserId === user.id 
        ? (<UpdateUser user={user}/>) 
        : (<Link href='/' className='text-blue-500 text-xs'>See all</Link>)}
      </div>
      {/*BOTTOM*/}
      <div className='flex flex-col gap-4 text-gray-500'>
        <div className='flex items-center gap-2'>
          <span className='text-xl text-black font-light'>{user.name && user.surname ? user.name + ' ' + user.surname : user.username}</span>
          <span className='text-sm font-light'>@{user.username}</span>
        </div>
        {user.description && <p>
        {user.description}
        </p>}
        {/*Onderstaande nagenoeg vooraf zelf gemaakt. Nog te controleren vanaf 1:42:54 Youtube*/}
        <div className='flex flex-col text-xs gap-4'>
          {user.city && <div className='flex items-center gap-2'>
            <Image src='/map.png' alt='' width={16} height={16} className='w-4 h-4 object-cover'/>
            <span>Living in <b>{user.city}</b></span>
          </div>}
          {user.school && <div className='flex items-center gap-2'>
            <Image src='/school.png' alt='' width={16} height={16} className='w-4 h-4 object-cover'/>
            <span >Went to <b>{user.school}</b></span>
          </div>}
          {user.work && <div className='flex items-center gap-2'>
            <Image src='/school.png' alt='' width={16} height={16} className='w-4 h-4 object-cover'/>
            <span >Job category <b>{user.work}</b></span>
          </div>}
          {user.business && <div className='flex items-center gap-2'>
            <Image src='/work.png' alt='' width={16} height={16} className='w-4 h-4 object-cover'/>
            <span>My company <b>{user.business}</b></span>
          </div>}
          <div className='flex items-center justify-between gap-2'>
            {user.website && <div className='flex items-center gap-2'>
              <Image src='/link.png' alt='' width={16} height={16} className='w-4 h-4 object-cover'/>
              <Link href='/' className='text-blue-400'>{user.website}</Link>
            </div>}
            {<div className='flex items-center gap-1'>
              <Image src='/date.png' alt='' width={16} height={16} className='w-4 h-4 object-cover'/>
              <span className='text-xs'>Joined {formattedDate}</span>
            </div>}
          </div>
          </div>
         {(currentUserId && currentUserId !== user.id) && <UserInfoCardInteraction 
          userId={user.id} 
          isUserBlocked={isUserBlocked}
          isFollowing={isFollowing}
          isFollowingSent={isFollowingSent}
          />}
      </div>
    </div>
  )
}

export default UserInfoCard

            