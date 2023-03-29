import React from 'react'
import nftpinasLogo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";


const footer = () => {
  return (
    <div className="bg-[#1F1D1B] w-full flex flex-col items-center justify-center h-[200px] min-w-[360px]">
      <div className="sm:w-1/2 md:w-1/3 sm:w-1/4">
        <div className="text-center">
          <span className='flex items-center justify-center font-light font-mono text-[#FFFFFF]'><Image src={nftpinasLogo} alt="NFTPinas Logo" height={50} width={50} /> NFTPINAS</span>
          <p className="text-[#FFFFFF] text-1xl font-light font-mono"> © 2022 NFTPinas. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default footer