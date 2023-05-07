import React, { useEffect, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Button from '../../../../components/Buttons/button'
import { FaEthereum, FaShoppingCart } from "react-icons/fa"
import LoadingPage from '../../../../components/Loading/new_loading'
import Input from '../../../../components/Input/input'

// Marketplace Context Import
import { MarketplaceActionsContext } from '../../../../context/MarketplaceActionsContext'

const fetchData = async (_authorId, _tokenId) => {
    const { data } = await axios.get(`https://api.nftpinas.io/v1/nfts/zksync-testnet/${_authorId}/${_tokenId}`)
    return data
}

const NFTPage = () => {
    const router = useRouter()
    const [ price, setPrice ] = useState(0)
    const { listItem, buyNFT } = useContext(MarketplaceActionsContext)
    const _authorId = typeof router.query?.authorId === "string" ? router.query.authorId : "";
    const _tokenId = typeof router.query?.tokenId === "string" ? router.query.tokenId : "";

    const { data, isLoading, isFetching } = useQuery(["getNft", _authorId, _tokenId], () => fetchData(_authorId, _tokenId), {
        enabled: true
    })

    if (isLoading) {
        return <LoadingPage />
    }

    if (!data) return <div>No Data Found</div>

    const item = data.data;

    return (
        <div className="bg-[#1F1D1B] w-full flex">
            <div className="flex flex-col md:flex-row my-[2rem] w-full h-full">
                <div className="mx-auto">
                    <div className="relative w-[300px] h-[300px] rounded-xl">
                        <Image
                            src={item.metadata.image}
                            alt="Picture of NFT"
                            className="rounded-xl"
                            layout='fill'
                        />
                        <div className='absolute top-[1rem] ml-[1rem]'>
                            <div className='bg-black bg-slate-900 font-mono text-[#FFFF] text-sm font-semibold px-[0.5rem] rounded-lg '>
                                NFT ID: #{item.tokenId}
                            </div>
                        </div>
                    </div>
                    <div className="my-[1rem]">
                        <p className='font-mono text-sm font-bold text-[#DD9F00]'>Owner: <span className='font-semibold font-mono text-white'>{item.owner.slice(0,4) + "..."  + item.owner.slice(39,42)}</span></p>
                        <p className='font-mono text-sm font-bold text-[#DD9F00]'>Origin: <span className='font-semibold font-mono text-white'>{item.contractAddress.slice(0,4) + "..."  + item.contractAddress.slice(39,42)}</span></p>
                    </div>
                </div>
                <div className="w-full md:w-[70%] md:px-[2rem]">
                    <h1 className="font-mono text-white text-lg">{item.metadata.name} #{item.tokenId}</h1>
                    <p className="font-mono text-white font-semibold text-sm text-slate-300">{item.metadata.description}</p>
                    <div className="mt-[2rem]">
                        {/* Add logic here for the item's listed status */}
                        <div className="flex flex-col items-center md:items-start">
                            <span className='font-mono text-[#DD9F00] text-2xl'>This item is not listed yet.</span>
                            <Input size={350} label={'Price'}  type={'number'} onChange={(e) => setPrice(e.target.value)}/>
                            <Button height={50} width={180} shape="square" label="List" onClick={() => listItem(price, item.tokenId, item.authorId)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFTPage