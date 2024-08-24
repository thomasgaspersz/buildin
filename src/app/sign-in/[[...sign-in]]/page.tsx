import { SignIn } from "@clerk/nextjs";

export default function Page() {
      return (
        <div className='h-[calc(100vh-96px)] flex items-center justify-center md:gap-4 xl:gap-8'>
            <SignIn/>;
        </div>
      )
}