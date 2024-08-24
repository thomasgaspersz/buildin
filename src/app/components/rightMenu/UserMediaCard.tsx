import Link from 'next/link'
import Image from 'next/image' 
import { User } from '@prisma/client'
import prisma from '@/app/lib/client'


const UserMediaCard = async ({user}:{user:User}) => {

  //VERDER YT:3:32:14
  const postWithMedia = await prisma.post.findMany({
    where:{
      userId:user.id,
      img:{
        not:null,
      },
    },
    take:9,
    orderBy:{
      createdAt: 'desc'
    },
  })

  return (
    <div className='p-4 bg-white rounded-lg shadow-md  text-sm flex flex-col gap-4'>
      {/*TOP*/}
      <div className='flex justify-between items-center font-medium'>
        <span className='text-gray-500'>User Media</span>
        <Link href='/' className='text-blue-500 text-xs'>See all</Link>
      </div>
      {/*BOTTOM*/}


      {/*Eigen manier YT 1:46:00*/}
        <div className={`grid gap-x-3 gap-y-3 grid-cols-3`} >
          {postWithMedia.length ? postWithMedia.map(post=>(
            <Image key={post.id} src={post.img!} alt='' width={130} height={130} className='h-full aspect-* object-cover rounded-md hover:scale-105 duration-500 transition-transform'></Image>
          )): 'No media found'}
        
        {/* <Image key={post.id} src='https://images.pexels.com/photos/17815963/pexels-photo-17815963/free-photo-of-blue-facade-of-residential-building.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load' alt='' width={150} height={150} className='object-cover rounded-md hover:scale-105 duration-500 transition-transform'></Image>
        <Image src='https://images.pexels.com/photos/27008964/pexels-photo-27008964/free-photo-of-a-tree-is-sitting-on-the-shore-of-a-lake.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load' alt='' width={150} height={150} className='object-cover rounded-md hover:scale-105 duration-500 transition-transform'></Image>
        <Image src='https://images.pexels.com/photos/24017562/pexels-photo-24017562/free-photo-of-purple-blossoms-on-tree.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load' alt='' width={150} height={150} className='object-cover rounded-md hover:scale-105 duration-500 transition-transform'></Image>
        <Image src='https://images.pexels.com/photos/27362956/pexels-photo-27362956/free-photo-of-woman-in-white-dress-standing-and-holding-shawl.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load' alt='' width={150} height={150} className='object-cover rounded-md hover:scale-105 duration-500 transition-transform'></Image>
        <Image src='https://images.pexels.com/photos/27302823/pexels-photo-27302823/free-photo-of-blueberries-on-and-near-plate.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load' alt='' width={150} height={150} className='object-cover rounded-md hover:scale-105 duration-500 transition-transform'></Image>
        <Image src='https://images.pexels.com/photos/27203450/pexels-photo-27203450/free-photo-of-a-narrow-street-with-blue-shutters-and-white-walls.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load' alt='' width={150} height={150} className='object-cover rounded-md hover:scale-105 duration-500 transition-transform'></Image>
        <Image src='https://images.pexels.com/photos/27402086/pexels-photo-27402086/free-photo-of-a-large-fish-swimming-in-the-water.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load' alt='' width={150} height={150} className='object-cover rounded-md hover:scale-105 duration-500 transition-transform'></Image>
        <Image src='https://images.pexels.com/photos/26737193/pexels-photo-26737193/free-photo-of-musei-capitolini.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load' alt='' width={150} height={150} className='object-cover rounded-md hover:scale-105 duration-500 transition-transform'></Image>
        <Image src='https://images.pexels.com/photos/23695268/pexels-photo-23695268/free-photo-of-glass-of-coffee-on-a-wooden-table.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load' alt='' width={150} height={150} className='object-cover rounded-md hover:scale-105 duration-500 transition-transform'></Image> */}
      </div>
    </div>
  )
}

export default UserMediaCard