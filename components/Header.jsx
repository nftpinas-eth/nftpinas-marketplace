import React from "react";
import Image from "next/image";
import Link from "next/link";
import nftpinasLogo from "../assets/logo.png";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiMenuAlt4 } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { client } from "../lib/sanity_client";
import { MdOutlineExplore } from "react-icons/md";
import { BiCollection } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import { ethers } from 'ethers'


const style = {
  navbarWrapper: `flex justify-between items-center md:justify-center bg-white shadow-md w-full md:px-[20%] px-[1rem] py-[0.2rem]`,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: `md:flex hidden ml-[0.8rem] text-black font-sans font-[649] text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] my-[0.4rem] w-[520px] items-center bg-white border-[1.5px] rounded-[1.8rem] hover:bg-[#EEEEEF]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-black placeholder:text-[#8a939b]`,
  navbarItems: `flex flex-row items-center justify-end`,
  navbarItem: `flex items-center md:px-4 font-sans font-semibold text-black hover:text-[#c8cacd] cursor-pointer`,
  navbarIcon: `text-black text-3xl font-black px-4 hover:text-[#c8cacd] cursor-pointer`,
  navbarStatus: `md:flex hidden inline-flex items-center px-1.5 py-2 rounded-full text-xs bg-yellow-100 text-yellow-800 yellow-pulse cursor-pointer `,
  navbarListItems: `md:flex text-black hidden list-none flex-row justify-between items-center flex-initial`,
  wallet: `text-white font-sans font-semibold bg-black py-[0.3rem] px-[0.9rem] rounded-full cursor-pointer hover:bg-black`,
  navbarMenuListItems: `z-10 fixed absolute top-[3.4rem] right-[0.9rem] w-[12rem] h-[45vw] p-3 md:hidden list-none flex flex-col justify-start items-start rounded-md shadow-[0_4px_10px_2px_rgba(0,0,0,0.3)] bg-white border-solid animated-slide-in`,
};

const Header = () => {
  const [ accounts, setAccounts] = useState(""); // Wallet Account
  const [ toggleMenu, setToggleMenu] = React.useState(false); // Toggle Mobile Menu

  const connectMetaMask = async () => {
    
    if (window.ethereum) {
        try {
            const account = await window.ethereum.request({ method: 'eth_requestAccounts'});
            if (account.length) {
              setAccounts(account[0])
            } else {
              console.log("MetaMask not connected")
            }
        } catch (error) {
            console.log("Error Connectin to MetaMask", error)
        }
    } else {
        alert("Please install MetaMask")
    }
    

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (account) {
      setAccounts(account[0])
      await connectMetaMask()
    })

  }

  useEffect(() => {
    connectMetaMask()

    if (!accounts) return;
    (async () => {
      const userDoc = {
        _type: "users",
        _id: accounts,
        userName: "NFTPinas_Users",
        walletAddress: accounts,
      };
      const result = await client.createIfNotExists(userDoc);
    })();
  }, [accounts]);

  return (
    <div className={style.navbarWrapper}>
      <title>NFTPinas</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={nftpinasLogo} height={50} width={50} />
          <div className={style.logoText}>NFTPinas</div>
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          {}
          <AiOutlineSearch />
        </div>
        <input className={style.searchInput} placeholder="Search Items" />
      </div>
      <div className={style.navbarItems}>
        <div className={style.navbarStatus}>
          <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="5" r="3"></circle>
          </svg>
          <span className="px-1 m1-1.5 font-sans font-bold">
            BETA MODE
          </span>
        </div>
        <div className={style.navbarIcon}>
          {accounts ? <CgProfile /> : <CgProfile />}
        </div>
        <ul className={style.navbarListItems}>
          <Link href="/explore">
            <div className={style.navbarItem}> Explore </div>
          </Link>
          <Link href="/">
            <div className={style.navbarItem}> My Collection </div>
          </Link>
          <Link href="/mint">
            <div className={style.navbarItem}> Mint </div>
          </Link>
          <li className={style.wallet}>
            {accounts ? (
              <button>
                <p className="">
                  {accounts[0] +
                    accounts[1] +
                    accounts[2] +
                    accounts[3] +
                    "..." +
                    accounts[39] +
                    accounts[40] +
                    accounts[41]}
                </p>
              </button>
            ) : (
              <button onClick={() => connectMetaMask()}>
                Connect Wallet
              </button>
            )}
          </li>
        </ul>
        <div className="relative flex">
          {toggleMenu ? (
            <AiOutlineClose
              fontSize={28}
              className="text-black cursor-pointer md:hidden"
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <HiMenuAlt4
              fontSize={28}
              className="text-black cursor-pointer md:hidden"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <ul className={style.navbarMenuListItems}>
              <Link href="/explore">
                <div className={style.navbarItem}>
                  <MdOutlineExplore className="m-1 w-7 h-7" /> Explore{" "}
                </div>
              </Link>
              <Link href="/">
                <div className={style.navbarItem}>
                  <BiCollection className="m-1 w-7 h-7" /> Collection{" "}
                </div>
              </Link>
              <Link href="/mintNFT">
                <div className={style.navbarItem}>
                  <FiPlusSquare className="m-1 w-7 h-7" /> Mint{" "}
                </div>
              </Link>
              <li className={style.wallet}>
                {accounts ? (
                  <button>
                    <p className="">
                      {accounts[0] +
                      accounts[1] +
                      accounts[2] +
                      accounts[3] +
                      "..." +
                      accounts[39] +
                      accounts[40] +
                      accounts[41]}
                    </p>
                  </button>
                ) : (
                  <button onClick={() => connectMetaMask()}>
                    Connect Wallet
                  </button>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
