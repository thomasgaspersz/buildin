'use client'

import { switchBlock, switchFollow } from "@/app/lib/actions";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
    userId,
    isUserBlocked,
    isFollowing,
    isFollowingSent,
}:{
    userId: string;
    isUserBlocked: boolean;
    isFollowing: boolean;
    isFollowingSent: boolean;
}) => {
    const [userState, setUserState] = useState({
        following: isFollowing,
        blocked: isUserBlocked,  // bug gefixt, er stond een , ipv : >> VERDER BIJ YT:3:16:01
        followingRequestSent: isFollowingSent 
    })

    const follow = async () => {
           switchOptimisticState('follow')    
        try {
            await switchFollow (userId)
           setUserState(prev =>({
            ...prev,
            following:prev.following && false,
            followingRequestSent: 
                !prev.following && !prev.followingRequestSent ? true : false,

        }))
        } catch (err) {
           console.log(err)
        }
    }

    const block = async () => {
        switchOptimisticState('block')    
        try {
            await switchBlock(userId)
            setUserState(prev =>({
                ...prev, blocked: !prev.blocked,
            }))
        } catch (err) {
            console.log(err)
        }
    }
    
    const [optimisticState, switchOptimisticState] = useOptimistic(
        userState, (state, value: 'follow' | 'block') => 
            value==='follow' 
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent: 
                !state.following && !state.followingRequestSent ? true : false,
        }  
        : {...state, blocked: !state.blocked} 
    )
        return (
    <>
        <form action={follow}><button className='w-full bg-blue-500 text-white text-sm rounded-lg p-2'>{
        optimisticState.following 
        ? 'Following' 
        : optimisticState.followingRequestSent 
        ? 'Partner Request Sent' 
        : 'Follow'
        }</button></form>
        <form action={block} className='self-end'><button><span className='text-xs text-red-400 cursor-pointer'>{optimisticState.blocked ? 'Unblock user' : 'Block user'}</span></button></form>
    </>
  )
}

export default UserInfoCardInteraction

