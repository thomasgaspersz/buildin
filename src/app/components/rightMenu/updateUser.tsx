'use client'

import { updateProfile } from "@/app/lib/actions"
import { User } from "@prisma/client"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useActionState, useState } from "react"
import UpdateButton from "./updateButton"

const UpdateUser = ({user}:{user: User}) => {
  
  const [open, setOpen] = useState(false)
  const [cover, setCover] =useState<any>(false)
  
  const [state, formAction] = useActionState(updateProfile, {
    success:false,
    error: false
  })
  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
    state.success && router.refresh() // refreshed the page after closing the form. 
    state.success = false // after closing the form. set the success state of the form to false. 
  }


  //YT: 4:26:44 VERDER

  return (
    <div className=''>
      <span className='text-blue-500 text-xs cursor-pointer' onClick={()=>setOpen(true)}>Update</span>
      {open && (
        <div className='absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50'>
          <form 
          action={(formData)=>formAction({formData, cover:cover?.secure_url || ''})} 
          className='p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative'>
            {/*TITLE*/}
            <h1>Update Profile</h1>
            <div className='mt-4 text-xs text-gray-500'>
              Use the navbar profile to change te avator or username
            </div>
          {/*COVER PICTURE UPLOAD*/}
          <CldUploadWidget uploadPreset="buildr" onSuccess={(result)=>setCover(result.info)}>
            {({ open }) => {
              return (
                <div className='flex flex-col gap-4 my-2' onClick={()=>open()}>
                        <label htmlFor=''>Cover Picture</label>
                        <div className='flex items-center gap-2 cursor-pointer'>
                          <Image src={user.cover || "/noCover.png"} alt='' width={208} height={112} className='w-52 h-28 rounded-md object-cover shadow-md'/>
                          <span className='text-xs underline text-gray-600'>Change</span>
                        </div>
                      </div>
              );
            }}
          </CldUploadWidget>
          {/*WRAPPER*/}
         
            <div className='flex flex-wrap justify-between gap-2 xl:gap-4'>
              
            {/* INPUT */}
            <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder={user.name || "John"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  placeholder={user.surname || "Doe"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="surname"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-gray-500">
                  Bio
                </label>
                <input
                  type="text"
                  placeholder={user.description || "Life is beautiful..."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="description"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  placeholder={user.city || "New York"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="city"
                />
              </div>
              {/* INPUT */}

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  type="text"
                  placeholder={user.school || "MIT"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="school"
                />
              </div>
              {/* INPUT */}

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-gray-500">
                  Job category
                </label>
                <input
                  type="text"
                  placeholder={user.work || "Designer"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="work"
                />
              </div>
              {/* INPUT */}

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-gray-500">
                  Business
                </label>
                <input
                  type="text"
                  placeholder={user.business || "Apple Inc."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="business"
                />
              </div>
               {/* INPUT */}

               <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-gray-500">
                  About us
                </label>
                <input
                  type="text"
                  placeholder={user.aboutUs || "Apple Inc."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="about"
                />
              </div>
              {/* INPUT */}

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  placeholder={user.website || "lama.dev"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="website"
                />
              </div>
            </div>
  
            <UpdateButton/>
            {state.success && <span className='text-green-500'>Profile has been updated!</span>}
            {state.error && <span className='text-red-500'>Something went wrong!</span>}
          <div className='absolute text-xs right-3 top-2 cursor-pointer text-blue-500 font-extrabold' onClick={handleClose}>
            X
          </div>
          </form>
        </div>)}
      </div>
  )
}

export default UpdateUser