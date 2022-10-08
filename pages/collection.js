import React, { useState, useEffect } from 'react'
import MarketplaceABI from "../contractsABI/Marketplace.json"
import MintABI from "../contractsABI/Mint.json"
import { ethers } from "ethers"
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'

const style = {
    container: `flex flex-row justify-center item-center `,
    subContainer: `grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4 m-[5rem]`,
    nftContainer: `overflow-hidden border shadow rounded-xl`,
    nftTitle: `text-2xl font-semibold`,
    nftDescription: `text-gray-400`,
  }

const collection = () => {
  const [data, fetchData] = useState([])
  const [walletAddress, setWalletAddress] = useState("")
  const [loading, setLoading] = useState(true)


    const initializeContract = async (accounts) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const marketplace =  new ethers.Contract(marketplaceAddress, MarketplaceABI.abi, signer);
      const nft =  new ethers.Contract(mintAddress, MintABI.abi, signer)

      const account = await window.ethereum.request({ method: 'eth_requestAccounts'});
      const addr3 = account[0].toUpperCase()

      const tokenCount = await nft.tokenCount()

      let data = []

      for (let i = 1; i <= tokenCount; i++) {
      const owner = await nft.ownerOf(i)
      const ownerU = owner.toUpperCase()

      if ( ownerU == addr3 ) {
        const uri = await nft.tokenURI(i)
        const response = await fetch(uri)
        const metadata = await response.json()

        console.log(i)
        console.log(metadata.name)

        data.push({
          image: metadata.image,
          name: metadata.name,
          description: metadata.description
        })

      } 

      fetchData(data)
      setLoading(false)
      }

    }

    useEffect (()=>{
      initializeContract()
    }, [])

    if (loading) return (
        <>
              <Header />
                <div className={style.container}>
                  <div className={style.subContainer}>
                    <h2>Loading.. Please Wait</h2>
                  </div>
                </div>
              <Footer />
        </>
      )

    return (
    <>
    <Header />
      <div className={style.container}>
        
        {data.length > 0 ?
          <div className={style.subContainer}>
            {data.map((nft, i) =>(
              <div key={i} className={style.nftContainer}>
                <div className="p-4">
                  <Image
                      src={nft.image}
                      alt="Picture of the author"
                      width={500}
                      height={500}
                  />
                  <p style={{ height: '64px'}} className={style.nftTitle}>
                    {nft.name}
                  </p>
                  <div style={{ height: '70px', overflow: 'hidden'}}>
                    <p className={style.nftDescription}>{nft.description}</p>
                  </div>
                </div>
              </div>
            ))}
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

export default collection