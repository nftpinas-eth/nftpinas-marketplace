// Import Icons
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import { HiMenu, HiMenuAlt4 } from "react-icons/hi"
import { MdOutlineExplore } from "react-icons/md"
import { BiCollection } from "react-icons/bi"
import { FiPlusSquare } from "react-icons/fi"

//Import Componets
import React from "react"
import Image from "next/image"
import Link from "next/link"

//Import Hooks
import { useState, useEffect , useContext} from "react"
import { useRouter } from 'next/router'


//Import Libraries
import { ethers } from 'ethers'


//Internal Import
import nftpinas_logo from "../assets/logo.png"
import irvin_wagmi from "../assets/irvin.jpg"
import { MarketplaceContext } from '../context/MarketplaceContext'
import Button from '../components/Buttons/button'



const HeaderNew = () => {
    const router = useRouter()
    const { connectWallet, address } = useContext(MarketplaceContext)
    const [isFocused, setIsFocused] = useState(false)
    const [activeIndex, setActiveIndex] = useState(null);
    const [ toggleMenu, setToggleMenu] = React.useState(false) // Toggle Mobile Menu

    function handleClick(index) {
        if (index === 0) {
            setActiveIndex(index)
            router.push('/explore')
        } else if (index === 1) {
            setActiveIndex(index)
            router.push('/mint')
        } else {
            setActiveIndex(null)
            router.push('/')
        }
    }

  return (
    <div className="bg-[#1E2328] h-[50px] w-full flex items-center drop-shadow-xl">
        <div className="container w-full flex justify-between items-center px-[2rem] mx-auto  ">
            <div onClick={() => handleClick(null)} className="flex items-center mx-[4px] cursor-pointer">
                <Image src={nftpinas_logo} alt="NFTPinas_Logo" height={40} width={40} />
                <h1 className="text-[#FFFFFF] font-mono text-base mx-[4px] max-md:hidden sm:text-xl lg:text-2xl">NFTPINAS</h1>
            </div>
            <div className={`flex items-center bg-[#2A292B] h-[34px] w-[340px] max-[350px]:hidden max-[350px]:w-[100px] rounded-lg ${isFocused ? 'border-[#DD9F00] border-[1px]' : ''}`}>
                <AiOutlineSearch className={`text-[#FFFFFF] mx-3 text-lg ${isFocused ? 'text-[#DD9F00]' : ''}`} />
                <input
                    className={`bg-transparent text-[#FFFFFF] font-light font-mono mr-3 placeholder:text-[#FFFFFF] w-full outline-0 ${isFocused ? 'text-[#DD9F00] placeholder:text-[#DD9F00]' : ''}`}
                    placeholder="Search"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
            <div className="flex items-center mx-[4px]">
                <div className="flex max-[810px]:hidden items-center font-mono text-xs text-[#DD9F00] bg-[#2A292B] rounded-full cursor-pointer p-[4px] h-[30px]">
                    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="5" r="3"></circle>
                    </svg>
                    <span className="px-1 m1-1.5 font-mono font-bold mx-[4px]">
                        BETA MODE
                    </span>
                </div>

                {address ? 
                    <Link href={`/mynfts?address=${address}`}>
                        <Image
                            src={irvin_wagmi}
                            alt="Image Preview"
                            className="rounded-full"
                            height={30}
                            width={30}
                        />
                    </Link>
                    : 
                    
                    <CgProfile className="w-[30px] h-[30px] text-[#FFFFFF] mx-[4px]" />
                }
            </div>
            { toggleMenu ? (
                <AiOutlineClose
                    fontSize={28}
                    className="text-[#FFFFFF] cursor-pointer md:hidden"
                    onClick={() => setToggleMenu(false)}
                />
            )
            : (
                <HiMenuAlt4
                fontSize={28}
                className="text-[#FFFFFF] cursor-pointer md:hidden"
                onClick={() => setToggleMenu(true)}
              />

            )}
            {toggleMenu && (
            <ul className="z-10 fixed absolute top-[4rem] font-mono right-[0.9rem] w-[12rem] h-[9.7rem] p-3 md:hidden list-none flex flex-col justify-start items-start rounded-md shadow-[0_4px_10px_2px_rgba(0,0,0,0.3)] bg-[#1F1D1B] border-solid animated-slide-in">
                <li
                    className={`px-2 py-1 cursor-pointer flex items-center ${activeIndex === 0 ? 'font-mono font-semibold text-[#DD9F00] ' : 'text-[#FFFFFF]'}`}
                    onClick={() => handleClick(0)}
                >
                <MdOutlineExplore className="m-[4px] w-7 h-7" /> Explore
                </li>
                <li
                    className={`px-2 py-1 cursor-pointer flex items-center  ${activeIndex === 1 ? 'font-mono font-semibold text-[#DD9F00]' : 'text-[#FFFFFF]'}`}
                    onClick={() => handleClick(1)}
                >
                <FiPlusSquare className="m-[4px] w-7 h-7" /> Mint
                </li>
                <li className="`px-2 py-1 cursor-pointer flex items-center ">
                    {address ? (
                    <li
                        className={`px-2 py-1 cursor-pointer flex items-center ${activeIndex === 3 ? 'font-mono font-semibold text-[#DD9F00]' : 'text-[#FFFFFF]'}`}
                        onClick={() => handleClick(1)}
                    >
                    <CgProfile className="m-[4px] w-7 h-7" /> Profile
                    </li>
                    ) : (
                    <Button height={40} width={80} shape="square" label="Connect" onClick={() => connectWallet()} />
                    )}
                </li>
            </ul>
          )}
            <ul className="flex justify-between max-md:hidden">
                <li
                    className={`px-2 py-1 cursor-pointer mx-[6px] ${activeIndex === 0 ? 'font-mono font-semibold text-[#DD9F00] border-b-2 border-[#DD9F00]' : 'text-[#FFFFFF]'}`}
                    onClick={() => handleClick(0)}
                >
                    Explore
                </li>
                <li
                    className={`px-2 py-1 cursor-pointer mx-[6px] ${activeIndex === 1 ? 'font-mono font-semibold text-[#DD9F00] border-b-2 border-[#DD9F00]' : 'text-[#FFFFFF]'}`}
                    onClick={() => handleClick(1)}
                >
                    Mint
                </li>
                <Button height={30} width={80} shape="square" label="Connect" onClick={() => connectWallet()} />
            </ul>
        </div>
    </div>
  )
}

export default HeaderNew