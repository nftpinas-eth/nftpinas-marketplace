import React from "react";
import irvinProfile from "../assets/irvin.jpg";
import Image from "next/image";
import { BsFillShieldFill, BsGlobe } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import Button from '../components/Buttons/button'

const Hero = () => {
  return (
    <div className="bg-[#1F1D1B] w-full items-center justify-center flex flex-col min-w-[360px]">
      <div className="max-w-[1280px] flex justify-between items-center md:flex-row md:m-[8rem] mx-auto ">
        <div className="flex items-start flex-col md:mx-10 mx-10 my-[3rem]">
          <div className="font-mono text-[#FFFFFF] text-4xl">Support Filipino #NFT Projects</div>
          <div className="font-mono text-[#FFFFFF] text-sm mt-[0.8rem] mb-[2.5rem]">
            NFTPinas offers fast, cheap, and secured transactions in zkSync.
          </div>
          <Button height={40} width={270} shape="square" label="Learn More"/>
        </div>

        <div className="flex justify-content items-start flex-col md:mx-10 mx-10 my-[3rem]">
          <div className="rounded-[5rem] flex flex-col md:w-[350px] md:h-[450px]">
            <img
              className="rounded-t-lg"
              src="https://lh3.googleusercontent.com/rkb24kmM_4EQm6OZ8FR-pm-AUoMystofkv47eGmxXpSc4xwQOoqZoQqNWEPqm7eyBLSJ3zqFPHjkUvvpgxiuQj0pge-19OLa0zMDcw=w600"
              alt=""
            />
            <div className="h-20 bg-[#1E2328] p-4 rounded-b-lg flex items-center text-white">
              <Image
                src={irvinProfile}
                alt="Image Preview"
                className="rounded-full"
                height={50}
                width={50}
              />
              <div className="flex flex-col justify-center ml-4">
                <div className="font-mono font-semibold text-xl">ethph.eth</div>
                <a className="text-[#DD9F00] font-mono text-lg" href="/">
                  Owner
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-1 relative justify-between flex flex-row py-8  bg-[#DD9F00] shadow-xl mb-[-3rem] rounded-lg">
          <p className="flex flex-col items-center w-full font-semibold font-mono md:flex-row">
            <BsFillShieldFill className="w-8 h-8 mx-4" /> Fully Secured
          </p>
          <p className="flex flex-col items-center w-full font-semibold font-mono md:flex-row">
            <BsGlobe className="w-8 h-8 mx-4" />
            Built-in zkSync
          </p>
          <p className="flex flex-col items-center w-full font-semibold font-mono md:flex-row">
            <GrTransaction className="w-8 h-8 mx-4" />
            Cheaper Transaction
          </p>
      </div>
    </div>
  );
};

export default Hero;
