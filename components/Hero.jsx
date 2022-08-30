import React from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import irvinProfile from '../assets/irvin.jpg'
import Image from 'next/image'
import { BsFillShieldFill, BsGlobe } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";


const style = {
    sectionWrapper: `flex justify-center items-center flex-col w-full`,
    contentWrapper: `flex flex-col justify-between items-center md:flex-row md:m-[8rem] flex-1`,
    contentItems: `flex justify-content items-start flex-col md:mx-10 mx-10 my-[3rem]`,
    cardContainer: `rounded-[5rem] flex flex-col md:w-[350px] md:h-[450px]`,
    title: `relative text-black text-[36px] font-semibold`,
    description: `text-[#8a939b] container-[400px] text-1xl mt-[0.8rem] mb-[2.5rem]`,
    button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer md:w-[10vw]`,
    ctaContainer: `flex`,
    accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
    infoContainer: `h-20 bg-black p-4 rounded-b-lg flex items-center text-white`,
    author: `flex flex-col justify-center ml-4`,
    name: `font-semibold`,
    infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
    siteInfoWrapper: 'z-1 relative flex flex-col py-8 md:w-[760px] md:rounded-xl text-center md:border md:border-slate-100 md:bg-white md:shadow-xl md:mb-[-3rem] ',
    siteInfoContainer: 'flex flex-row justify-between md:mx-10',

}

const Hero = () => {
  return (
    <div className={style.sectionWrapper}>
      <div className={style.contentWrapper}>
          
          <div className={style.contentItems}>
            <div className={style.title}>
                Support Filipino #NFT Projects
              </div>
              <div className={style.description}>
                  NFTPinas offers fast, cheap, and secured transactions in zkSync. 
              </div>
              <div className={style.ctaContainer}>
                <button className={style.accentedButton}>Learn More</button>
            </div>
          </div>

          
          <div className={style.contentItems}>
              <div className={style.cardContainer}>
                <img className='rounded-t-lg' src="https://lh3.googleusercontent.com/rkb24kmM_4EQm6OZ8FR-pm-AUoMystofkv47eGmxXpSc4xwQOoqZoQqNWEPqm7eyBLSJ3zqFPHjkUvvpgxiuQj0pge-19OLa0zMDcw=w600" alt="" 
                />
                <div className={style.infoContainer}>
                  <Image src={irvinProfile} className='rounded-full' height={50} width={50} />
                  <div className={style.author}>
                    <div className={style.name}>ethph.eth</div>
                    <a className='text-[#1868b7]' href="/">Owner</a>
                  </div>
                </div>
              </div>
          </div>

      </div>

      <div className={style.siteInfoWrapper}>
        <div className={style.siteInfoContainer}>
          <p className='flex flex-col items-center w-full font-semibold md:flex-row text-slate-800'><BsFillShieldFill className='w-8 h-8 mx-2' /> Fully Secured</p>
          <p className='flex flex-col items-center w-full font-semibold md:flex-row text-slate-800'><BsGlobe className='w-8 h-8 mx-2' />Built-in zkSync</p>
          <p className='flex flex-col items-center w-full font-semibold md:flex-row text-slate-800'><GrTransaction className='w-8 h-8 mx-2' />Cheaper Transaction</p>
        </div>
      </div>

    </div>
  )
}

export default Hero