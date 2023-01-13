import React, { useState, useEffect, useContext, Suspense } from 'react'
import MarketplaceABI from "../contractsABI/Marketplace.json"
import { ethers } from "ethers"
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { marketplaceAddress, mintAddress } from '../config'
import { Provider } from "zksync-web3";
import axios from 'axios'
import { MarketplaceContext } from '../context/MarketplaceContext'
import { useQuery } from 'react-query'
import NftCard from '../components/NFTCard/nftcard'
import Link from 'next/link'
import { useRouter } from 'next/router';

const style = {
  container: `flex flex-row justify-center item-center `,
  subContainer: `grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4 m-[5rem]`,
}

export async function getServerSideProps() {
  const { data } = await axios.get('https://api.nftpinas.io/v1/nfts', {
      params: {
          isListed: true,
      },
  });

  return {
      props: {
          data: data,
      },
  };
}

const explore = ({ data }) => {
  const { fetchMarketItems } = useContext(MarketplaceContext)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      await fetchMarketItems()
      setLoading(false)
    })()
  }, [])

  const clickOnNft = (_address, _tokenId) => {
    router.push(`/asset/${_address}/${_tokenId}`)
  }
  
  if (loading) {
    return <p>Loading...</p>
  }
  
  const nftData = data ? data.data : []

  return (
      <>
      {nftData.length ? (
        <div className={style.container}>
            <div className={style.subContainer}>
              {nftData.map((nft) => 
                <NftCard key={nft.tokenId} image={nft.metadata.image} name={nft.metadata.name} price={nft.price} onClick={()=>clickOnNft(nft.owner_address, nft.tokenId)} />
              )}
            </div>
        </div>
        ) : (
          <p>No Listed NFTs found</p>
        )}
      </>
    )
}

export default explore