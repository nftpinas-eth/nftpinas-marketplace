import React, { useState, useEffect, useContext } from 'react'
import MarketplaceABI from "../contractsABI/Marketplace.json"
import MintABI from "../contractsABI/Mint.json"
import { ethers } from "ethers"
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { marketplaceAddress, mintAddress } from '../config'
import { Provider } from "zksync-web3";


const style = {
  container: `flex flex-row justify-center item-center `,
  subContainer: `grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4 m-[5rem]`,
  nftContainer: `overflow-hidden border shadow rounded-xl`,
  title: `font-mono font-black text-4xl text-slate-900 `,
  subTitle: `font-mono font-black text-lg text-slate-900`,
  description: `font-mono font-semibold text-sm text-slate-700`
}

export async function getServerSideProps() {
  const response = await fetch('')
  const data = await response.json()

  const provider1 = new Provider("https://zksync2-testnet.zksync.dev");
  const nftContract =  new ethers.Contract(mintAddress, MintABI.abi, provider1)

  const tokenCount = await nftContract.tokenCount()
  const tokenNumber = tokenCount.toNumber()

  if (data.length !== tokenNumber) {
    for (let i = data.length; i <= tokenNumber; i++) {
      const ownerToken = await nftContract.ownerOf(i)
      const owner = ownerToken.toLowerCase()
      const uri = await nftContract.tokenURI(i)
      const response = await fetch(uri)
      const metadata = await response.json()

      const resp = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: owner, image: metadata.image, name: metadata.name, description: metadata.description })})
    }
  }

  return {
    props: {
      nfts: data,
    }
  }
}

const mynfts = ({ nfts }) => {
   const [address, setAddress] = useState("")

    useEffect (()=>{
      connectWallet()

    }, [])

    const connectWallet = async () => {
      if (window.ethereum) {
          try {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
              setAddress(accounts[0])
            } catch (error) {
              console.log("Error", error)
          }
 
      } else {
          alert("Please install MetaMask")
      }

    }

    const result =  nfts.filter((nft) => {
      if (nft.address === address ) {
        return(nft)
      }
    })

    return (
      <>
      <Header />
        <div className={style.container}>
          {result.length > 0 ?
            <div className={style.subContainer}>
              {result.map((nft) => 
              
              <div key={nft.name} className={style.nftContainer}>
                  <Image
                      src={nft.image}
                      alt="Picture of the author"
                      width={500}
                      height={500}
                  />
                <div className="px-4">
                  <p style={{ height: '32px'}} className={style.subTitle}>
                    {nft.name}
                  </p>
                  <div style={{ height: '50px', overflow: 'hidden'}}>
                    <p className={style.description}>{nft.description}</p>
                  </div>
                </div>
              </div>
              )}
            </div>
          : (
            <main style={{ padding: "1rem 0" }}>
              <h2>No listed assets</h2>
            </main>
          )}
        </div>
      <Footer />
      </>
    )
}

export default mynfts