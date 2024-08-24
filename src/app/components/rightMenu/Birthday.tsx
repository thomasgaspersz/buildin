import Image from 'next/image'
import Link from 'next/link'


const Birthday = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md  text-sm flex flex-col gap-3'>
        {/*TOP*/}
      <div className='flex justify-between items-center font-medium'>
        <span className='text-gray-500'>Birthdays</span>
        <Link href='/' className='text-blue-500 text-xs'>See all</Link>
      </div>
        {/*USER*/}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
            <Image src='https://images.pexels.com/photos/17945214/pexels-photo-17945214/free-photo-of-young-man-reading-a-newspaper-on-the-balcony.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load' alt='' width={40} height={40} className='w-10 h-10 rounded-full object-cover'/>
            <span className='font-semibold flex-1'>Birthdays</span>
        </div>
        <div className='flex gap-3 justify-end'>
            <button className='bg-blue-500 rounded-md px-2 py-1 text-xs text-white'>Celebrate</button>
        </div>
      </div>
      {/*UPCOMMING BIRTHDAY*/}  
      <div className='p-4 bg-slate-100 rounded-lg flex items-center gap-4'>
      <Image src='/gift.png' alt='' width={24} height={24}/>   
      <Link href='/' className='flex flex-col gap-1 text-xs'>
        <span className='text-gray-700 font-semibold'>Upcoming Birthdays</span>
        <span>See other 16 upcoming birthdays</span>
      </Link> 
      </div>
    </div>
  )
}

export default Birthday