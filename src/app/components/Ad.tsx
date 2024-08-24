import Image from 'next/image'
import Link from 'next/link'

const Ad = ({size}:{size: 'sm' | 'md' | 'lg' }) => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md  text-xs'>
        {/*TOP*/}
        <div className='flex items-center justify-between'>
            <span>Sponsored Ads</span>
            <Image src='/more.png' alt='' width={16}  height={16}/>
        </div>
        {/*BOTTOM*/}
        <div className={`flex flex-col mt-4 ${size=== 'sm' ? 'gap-2' : 'gap-4'}`}>
            <div className={`relative w-full ${size==='sm' ? 'h-24' : size==='md' ? 'h-36' : '48'}`}>
            <Image src='https://eu.schluter.com/statics/www_schlueter_gb_2x/images/cumulus/ss_mil_BEKOTEC-EN-12FK-PS_001_02_a_rdax_480x270_75s.jpg' alt='' fill className='rounded-lg object-cover'/>
            </div>
            <div className='flex gap-4'>
            <Image src='https://eu.schluter.com/statics/www_schlueter_gb_2x/images/cumulus/ss_mil_BEKOTEC-EN-12FK-PS_001_02_a_rdax_480x270_75s.jpg' alt='' width={24} height={24} className='rounded-full w-6 h-6 object-cover'></Image>
            <span className='font-medium text-blue-500'>Lorem Ipsum</span>
            </div>
            <p className={`${size==='sm' ? 'text-xs' : 'text-sm'} text-slate-700`}>{size === 'sm' ? 'Lorem Ipsum is Lorem Ipsum sit amet consectetur adipisicing elig.' : size === 'md' ? 'Lorem Ipsum is Lorem Ipsum sit amet consectetur adipisicing elig.' :'Lorem Ipsum is Lorem Ipsum sit amet consectetur adipisicing elig. Doloribus nulla incidunt magni veritatis totam laudantium isure optio quis necessitatibus obcaecatie. Repudiandae maime fuga ut praesentium ea delentiti dolorum faacere asperiores.'}</p>
            <button className='bg-gray-100 text-gray-700 text-xs rounded-lg p-2'>
                Learn more
            </button>
        </div>
    </div>
  )
}

export default Ad