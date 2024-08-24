import Link from "next/link"
import Image from "next/image"
import { auth,  } from "@clerk/nextjs/server"
import prisma from "@/lib/client"
import PartnerRequestList from "./PartnerRequestList"

//YT:3:37:52

const PartnerRequest = async () => {

  const {userId} = auth()

  if(!userId) return null
  
  const requests = await prisma.followRequest.findMany({
    where:{
      receiverId: userId,
    },
    include:{
      sender:true,
    },
  })

  if(requests.length === 0 ) return null
  return (
    <div className='p-4 bg-white rounded-lg shadow-md  text-sm flex flex-col gap-4'>
      {/*TOP*/}
      <div className='flex justify-between items-center font-medium'>
        <span className='text-gray-500'>Partner Request</span>
        <Link href='/' className='text-blue-500 text-xs'>See all</Link>
      </div>
      {/*USERM*/}
      <PartnerRequestList requests={requests}/>
    </div>
  )
}

export default PartnerRequest