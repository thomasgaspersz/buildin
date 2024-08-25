'use server'// dit hoeft eigenlijk niet

import prisma from "@/lib/client"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"

const ProfileCard = async () => {

    const {userId} = auth()

    if (!userId) return null

    const user = await prisma.user.findFirst({
        where:{
            id:userId
        },
        include:{
            _count:{
                select:{
                    followers: true
                }
            }
        }
    })

    if (!user) return null
    

  return (
        <div className='p-4 bg-white rounded-lg shadow-md  text-sm flex justify-start flex-col gap-6'>
            <div className='h-32 relative'>
            <Image src={user.cover || '/noCover.png'} alt='' fill className='rounded-md object-cover'/>
            <Image src={user.avatar || '/noAvatar.png' } alt='' width={128} height={128} className=' object-cover w-32 h-32 rounded-full absolute left-0 right-0 -bottom-16 ring-4 ring-white z-10 m-auto'/>
            </div> 
            <div className='flex flex-col gap-2 mt-12 items-center'>
                <span className='font-extrabold text-xl'>{(user.name && user.surname) ? user.name + ' ' +  user.surname : user.username }</span>
                <div className='flex items-center gap-4'>
                    <div className='flex'>
                    <Image src='https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?cs=srgb&dl=pexels-maksgelatin-4352247.jpg&fm=jpg' alt='' width={20} height={20} className=' object-cover w-5 h-5 rounded-full'/>
                    <Image src='https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?cs=srgb&dl=pexels-maksgelatin-4352247.jpg&fm=jpg' alt='' width={20} height={20} className=' object-cover w-5 h-5 rounded-full'/>
                    <Image src='https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?cs=srgb&dl=pexels-maksgelatin-4352247.jpg&fm=jpg' alt='' width={20} height={20} className=' object-cover w-5 h-5 rounded-full'/>
                    </div>
                    <span className='text-xm text-gray-500'>{user._count.followers}</span>
                </div>
                <Link href={`/profile/${user.username}`}>
                    <button className='bg-blue-500 rounded-lg px-2 py-1 text-xs text-white'>
                        My Profile
                    </button>
                </Link>
            </div>
        </div>
  )
}

export default ProfileCard