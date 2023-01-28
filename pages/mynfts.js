import React, { useState, useEffect, useContext } from 'react'
import MarketplaceABI from "../contractsABI/Marketplace.json"
//import MintABI from "../contractsABI/Mint.json"
import { ethers } from "ethers"
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { marketplaceAddress, mintAddress } from '../config'
import { Provider } from "zksync-web3"
import axios from 'axios'
import { MarketplaceContext } from '../context/MarketplaceContext'
import { useQuery } from 'react-query'
import NftCard from '../components/NFTCard/nftcard'
import LoadingPage from '../components/Loading/loading'
import { useRouter } from 'next/router'

const style = {
  container: `flex flex-row justify-center item-center `,
  subContainer: `grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4 m-[5rem]`,
  nftContainer: `overflow-hidden border shadow rounded-xl`,
  title: `font-mono font-black text-4xl text-slate-900 `,
  subTitle: `font-mono font-black text-lg text-slate-900`,
  description: `font-mono font-semibold text-sm text-slate-700`
}

const fetchData = async (address) => {
  const { data } = await axios.get(`https://api.nftpinas.io/v1/nfts/${address}`)
  return data
}

export async function getServerSideProps(context) {
  const { address } = context.query
  const data = await fetchData(address)
  return {
    props: {
      data
    }
  }
}

const mynfts = ({ data }) => {
  const { fetchAllNfts, connectWallet, address } = useContext(MarketplaceContext)
  const router = useRouter()

    useEffect ( ()=>{
      connectWallet()
      fetchAllNfts()

    }, [])

    const { isLoading, isFetching, refetch } = useQuery(["getNft", address], () => fetchData(address), {
        enabled: true,
        initialData: data
    })

    const clickOnNft = (_address, _tokenId) => {
      router.push(`/asset/${_address}/${_tokenId}`)
    }
    
    if (isLoading) {
      return <LoadingPage />
    }

    if (!data) return <div>No Data Found</div>

    return (
      <>
        <div className={style.container}>
            <div className={style.subContainer}>
              {data.data.map((nft) => 
              //<NftCard key={nft.tokenId} image={nft.metadata.image} name={nft.metadata.name} onClick={()=>clickOnNft(nft.owner_address, nft.tokenId)} />
                <NftCard 
                key={nft.tokenId}
                src={nft.metadata.image}
                alt="NFT Image Preview"
                title={nft.metadata.name}
                description={nft.metadata.description}
                price={nft.price}
                isListed={false}
                creator={nft.owner_address.slice(0,4) + "..."  + nft.owner_address.slice(39,42)}
                onClick={()=>clickOnNft(nft.owner_address, nft.tokenId)}
              />
              )}
            </div>
        </div>
      </>
    )
}

export default mynfts