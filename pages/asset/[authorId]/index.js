import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import NftCard from '../../../components/NFTCard/nftcard'


const fetchData = async (id) => {
    const { data } = await axios.get(`https://api.nftpinas.io/v1/nfts/${id}`)
    return data
}

const style = {
    mainContainer: `flex h-[20vh] w-screen overflow-hidden justify-center items-center`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-screen px-4`,
    midRow: `w-full flex justify-center text-white`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-5rem]`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    socialIconsContainer: `flex text-3xl mb-[-2rem]`,
    socialIconsWrapper: `w-44`,
    socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
    socialIcon: `my-2`
}

const AuthorPage = () => {
    const router = useRouter()

    const nftId = typeof router.query?.authorId === "string" ? router.query.authorId : "";

    const { data, isLoading, isFetching } = useQuery(["getNft", nftId], () => fetchData(nftId), {
        enabled: true
    })

    const clickOnNft = (_address, _tokenId) => {
        router.push(`/asset/${_address}/${_tokenId}`)
    }

    if (isLoading) {
        return <div className="center">Loading...</div>;
    }

    if (!data) return <div>No Data Found</div>
   
    return (
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
      )
}

export default AuthorPage