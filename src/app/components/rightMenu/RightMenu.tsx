import { User } from "@prisma/client"
import Ad from "../Ad"
import Birthday from "./Birthday"
import PartnerRequest from "./PartnerRequest"
import UserInfoCard from "./UserInfoCard"
import UserMediaCard from "./UserMediaCard"
import { Suspense } from "react"

const RightMenu = ({user} :{user? : User}) => {
  return (
    <div className='flex flex-col gap-6'>
      {user ? (
        <>
        <Suspense fallback='loading...'>
        <UserInfoCard user={user}/>
        </Suspense>
        <Suspense fallback='loading...'>
        <UserMediaCard user={user}/>
        </Suspense>
        </>
      ) : null}
      {/*PARTNER REQUEST*/}
      <PartnerRequest/>
      {/*BIRTHDAYS*/}
      <Birthday/>
      {/*SPONSORED ADS*/}
      <Ad size='md'/>
    </div>
  )
}

export default RightMenu