// import React from 'react'
import Image from "next/image"
import nftpinasLogo from "../../assets/logo.png"


const loading = () => {
  return (

    <div class="flex items-center justify-center h-screen">
     <Image src={nftpinasLogo} alt="Image Preview" height={200} width={200} className="opacity-50 animate-pulse" />
    </div>
  )
}



export default loading
