import React from "react";
import nftpinasLogo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import {
  RiDiscordFill,
  RiFacebookBoxFill,
  RiTwitterFill,
} from "react-icons/ri";

const style = {
  sectionWrapper: `flex justify-center items-center h-[300px] w-full px-[10rem]`,
  sectionContainer: `flex flex-col items-start justify-start w-[100vw] my-[2rem]`,
  logoContainer:
    "flex flex-row items-center justify-center md:justify-start w-full border-b-2 my-2 p-2",
  logoText: `ml-[0.8rem] text-black font-semibold font-sans text-2xl`,
  copyrightContainer: `flex flex-col md:flex-row md:justify-between justify-center items-center w-full`,
  socialMediaContainer: `flex flex-row`,
};

const Footer = () => {
  return (
    <div className={style.sectionWrapper}>
      <div className={style.sectionContainer}>
        <div className={style.logoContainer}>
          <Image src={nftpinasLogo} height={50} width={50} />
          <div className={style.logoText}>NFTPinas</div>
        </div>
        <div className={style.copyrightContainer}>
          <p className="text-[#8a939b] text-1xl ">
            © 2022 NFTPinas. All rights reserved.
          </p>
          <div className={style.socialMediaContainer}>
            <a target="_blank" href="https://discord.gg/a6RXQ8J6M3">
              <RiDiscordFill className="w-10 h-8 text-zinc-900" />
            </a>
            <a target="_blank" href="https://www.facebook.com/nftpinas.eth">
              <RiFacebookBoxFill className="w-10 h-8 text-zinc-900" />
            </a>
            <a target="_blank" href="https://twitter.com/nftpinas_eth">
              <RiTwitterFill className="w-10 h-8 text-zinc-900" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
