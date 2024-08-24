'use client'

import prisma from "@/lib/client"
import { useUser } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import AddPostButton from "./AddPostButton"
import { addPost } from "@/lib/actions"

const AddPost = () => {

    const {user, isLoaded} = useUser()
    const [desc,setDesc]=useState('')
    const [img, setImg] =useState<any>('')


    if(!isLoaded) {
        return 'Loading...'
    }

return(

    // Momenteel YT 5:07:06  hier verder
  
    <div className='p-4 bg-white rounded-lg shadow-md flex flex-1 gap-4 justify-between text-sm overflow-hidden'>
        {/*AVATAR*/}
        <Image src={user?.imageUrl || '/noAvatar.png'} alt='' className='w-12 h-12 object-cover rounded-full' width={48} height={48}>
            
        </Image>
        {/*POST*/}
        <div className='flex-1'>
            {/*TEXT INPUT*/} 
            {/*Standaard wordt bij form action ook de formData mee verzonden, deze kun je dan meteen doorgeven aan de serverside action functie.*/}
            <form action={(formData)=>addPost(formData, img?.secure_url || '')} className='flex gap-4'>
                <textarea 
                placeholder='Wat heb je gedaan...' 
                name='desc' id='' 
                className='flex-1 bg-slate-100 rounded-lg p-2'
                onChange={()=>(e.target.value)}
                ></textarea>
                <div className=''>
                    <Image src='/emoji.png' alt='' className='w-5 h-5 object-cover rounded-full cursor-pointer self-end' width={20} height={20}></Image>
                    <AddPostButton/>
                </div>
            </form>
            {/*POST OPTIONS*/}
            <div className='flex items-center gap-4 mt-4 text-gray-400 flex-wrap'>
            <CldUploadWidget 
            uploadPreset="buildr" 
            onSuccess={(result,{widget})=>{
                setImg(result.info), 
                widget.close()}}>
            {({ open }) => {
              return (
                <div className='flex items-center gap-2 cursor-pointer' onClick={()=>open()}>
                <Image src='/addImage.png' alt='' width={20} height={20}></Image>
                Photo
                </div>                
              );
            }}
          </CldUploadWidget>
                <div className='flex items-center gap-2 cursor-pointer'>
                <Image src='/addVideo.png' alt='' width={20} height={20}></Image>
                Video
                </div>
                <div className='flex items-center gap-2 cursor-pointer'>
                <Image src='/poll.png' alt='' width={20} height={20}></Image>
                Poll
                </div>
                <div className='flex items-center gap-2 cursor-pointer'>
                <Image src='/addEvent.png' alt='' width={20} height={20}></Image>
                Event
                </div>
            </div>
        </div>
    </div>
)}


export default AddPost;