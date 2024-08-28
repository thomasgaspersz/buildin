import Link from "next/link"
import MobileMenu from "./MobileMenu"
import Image from "next/image"
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <div className='h-24 flex items-center justify-between'>
      {/*LEFT*/}
      <div className='md:hidden lg:block w-[20%]'>
      <Link className='font-extrabold text-3xl' href="/">BUILDR.</Link>
      </div>
      {/*CENTER*/}
      <div className='hidden md:flex w-[50%] text-sm items-center justify-between'>
        {/*LINKS*/}
        <div className='flex gap-6 text-black'>{/*Optional Font-Bold*/}
          <Link href='/' className='flex gap-1 items-center'>
          <Image src='/home.png' className='w-4 h-4' alt='Homepage' width={16} height={16}/>
          <span className="">Homepage</span>
          </Link>
          <Link href='/' className='flex gap-1 items-center'>
          <Image src='/friends.png' className='w-4 h-4' alt='Partners' width={16} height={16}/>
          <span className="">Partners</span>
          </Link>
          <Link href='/' className='flex gap-1 items-center'>
          <Image src='/stories.png' className='w-4 h-4' alt='Stories' width={16} height={16}/>
          <span className="">Stories</span>
          </Link>
        </div>
        <div className='hidden xl:flex pl-4 p-2 bg-slate-100 items-center rounded-xl'>
          <input type="text" placeholder="zoeken..." className='bg-transparent outline-none'/>
          <Image src='/search.png' alt="search" width={14} height={14}/>
        </div>
      </div>
      {/*RIGHT*/}
      <div className='w-[30%] flex items-center gap-4 xl:gap-8 justify-end'>
      <ClerkLoading>
        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white'/>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <div className='hidden md:block cursor-pointer'>
          <Image src='/people.png' alt='Signed in' width={24} height={24}/>
          </div>
          <div className='hidden md:block cursor-pointe'>
          <Image src='/messages.png' alt='Signed in' width={24} height={24}/>
          </div>
          <div className='hidden md:block cursor-pointe'>
          <Image src='/notifications.png' alt='Signed in' width={24} height={24}/>
          </div>
          <UserButton/>
        </SignedIn>
        <SignedOut>
          <div className='flex items-center gap-2 text-xs'>
            <Image src='/people.png' alt='Login' width={24} height={24}/>
            <Link href='/sign-in'>Login/Register</Link>
          </div>
        </SignedOut>
      </ClerkLoaded>
      <MobileMenu/>
      </div>
    </div>
      
  )
}

export default Navbar