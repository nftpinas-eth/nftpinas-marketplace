import React, { useState, useEffect, useContext, Suspense } from 'react'
import axios from 'axios'
import { DataFetchContext } from '../context/DataFetchContext'
import NftCard from '../components/NFTCard/nftcard'
import LoadingPage from '../components/Loading/loading'
import { useRouter } from 'next/router';

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

const Explore = ({ data }) => {
  const { fetchMarketItems } = useContext(DataFetchContext)
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
    return <LoadingPage />
  }
  
  const nftData = data ? data.data : []

  return (
      <>
      {nftData.length ? (
        <div className="bg-[#1F1D1B] w-full flex flex-row">
            <div className="w-full grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4 m-[5rem] mx-auto">
              {nftData.map((nft) => 
                //<NftCard key={nft.tokenId} image={nft.metadata.image} name={nft.metadata.name} price={nft.price} onClick={()=>clickOnNft(nft.owner_address, nft.tokenId)} />
                <NftCard 
                key={nft.tokenId}
                src={nft.metadata.image}
                alt="NFT Image Preview"
                title={nft.metadata.name}
                description={nft.metadata.description}
                price={nft.price}
                isListed={true}
                tokenId={nft.tokenId}
                marketId={nft.marketId}
                creator={nft.owner_address}
                onClick={()=>clickOnNft(nft.owner_address, nft.tokenId)}
              />
              )}
            </div>
        </div>
        ) : (
          <p>No Listed NFTs found</p>
        )}
      </>
    )
}

export default Explore