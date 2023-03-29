import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { MarketplaceContext } from '../context/MarketplaceContext'
import { useQuery } from 'react-query'
import NftCard from '../components/NFTCard/nftcard'
import LoadingPage from '../components/Loading/loading'
import { useRouter } from 'next/router'


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
        <div className="flex flex-row justify-center item-center">
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4 m-[5rem]">
              {data.data.map((nft) => 
                <NftCard 
                key={nft.tokenId}
                src={nft.metadata.image}
                alt="NFT Image Preview"
                title={nft.metadata.name}
                description={nft.metadata.description}
                price={nft.price}
                isListed={false}
                tokenId={nft.tokenId}
                creator={nft.owner_address}
                onClick={()=>clickOnNft(nft.owner_address, nft.tokenId)}
              />
              )}
            </div>
        </div>
      </>
    )
}

export default mynfts