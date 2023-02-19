import React from 'react'
import Image from 'next/image'
import { FaEthereum } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { useRouter } from 'next/router';

const NftCard = ({ src, alt, title, description, price, isListed, marketId, tokenId, creator, onClick }) => {
  const router = useRouter()
  const goToAuthorPage = (address) => {
    router.push(`/mynfts?address=${address}`)
  }
  
  return (
    <div  className='flex flex-col w-[300px] h-[470px] px-[14px] mx-auto bg-[#2A292B] drop-shadow-md rounded-xl '>
    <div className='relative w-[270px] h-[250px] my-[14px]'>
        <Image onClick={onClick}
            src={src}
            alt={alt}
            layout='fill'
            objectFit='fit'
            className='cursor-pointer rounded-xl'
        />
        {!isListed ? (
          <div className='absolute flex m-[4px] flex-col'>
            <div className='bg-black bg-slate-900 font-mono text-white text-sm font-semibold px-[0.5rem] rounded-lg w-max mb-[4px]'>Token #{tokenId}</div>
          </div>
        ) : 
          <div className='absolute flex m-[4px] flex-col'>
            <div className='bg-black bg-slate-900 font-mono text-white text-sm font-semibold px-[0.5rem] rounded-lg w-max mb-[4px]'>Token #{tokenId}</div>
            <div className='bg-red-800 font-mono text-white text-sm font-semibold px-[0.5rem] rounded-lg w-max'>Market #{marketId}</div>
          </div>
        }

    </div>

    <div className='max-woverflow-y-hidden text-overflow-ellipsis line-clamp-2'>
      <p className='text-white font-bold text-[20px]'>{title}</p>
      <p className='overflow-y-hidden text-gray-400 text-overflow-ellipsis line-clamp-2'>lorem</p>
    </div>

    <div className='flex mt-[20px]'>
        {!isListed ? (
          <div className='flex items-center'>
            <FaEthereum className='w-[17px] h-[17px] text-[#DD9F00]'/>
            <p className='font-bold text-[#DD9F00]'>Not Listed</p>
          </div>
        ) : 
        <div className='flex items-center'>
          <FaEthereum className='w-[17px] h-[17px] text-[#DD9F00]'/>
          <p className='font-bold text-[#DD9F00]'>{price}</p>
        </div>

        }

    </div>
    <hr className='my-[10px] bg-zinc-400' />
    <div className='flex items-center justify-center'>
          <CgProfile className='w-[40px] h-[40px] text-white'/>
          <p className='font-bold text-gray-400 mx-[10px]'>Creation of <span onClick={()=>goToAuthorPage(creator)} className='text-white cursor-pointer'>{creator.slice(0,4) + "..."  + creator.slice(39,42)}</span></p>
    </div>
    </div>
  )
  }
  
  export default NftCard