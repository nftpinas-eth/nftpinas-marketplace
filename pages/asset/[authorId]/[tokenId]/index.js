import React, { useEffect, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { data } from 'autoprefixer'
import Footer from '../../../../components/Footer'
import Header from '../../../../components/Header'
import Image from 'next/image'
import { Button } from 'react-bootstrap'
import { FaEthereum, FaShoppingCart } from "react-icons/fa"
import { marketplaceAddress } from '../../../../config'
import MarketplaceABI from "../../../../contractsABI/Marketplace.json"
import { ethers } from 'ethers'

// Marketplace Context Import
import { MarketplaceContext } from '../../../../context/MarketplaceContext'
import { list } from 'postcss'

const style = {
    container: `flex flex-col justify-center items-center shrink-0 grow-0 mx-[2rem] md:max-w-5xl h-screen md:m-auto`,
    subContainer: `flex flex-col md:flex-row my-[2rem] w-full h-full text-white`,
    nftImgWrapper: `w-full md:w-[30%]`,
    nftImg: `relative w-full h-[300px]`,
    nftId: `bg-black bg-slate-900 font-mono text-white text-sm font-semibold px-[0.5rem] rounded-lg w-max`,
    nftInfoWrapper: `my-[1rem]`,
    nftCardWrapper: `w-full md:w-[70%] md:px-[2rem]`,
    nftSaleWrapper: `flex flex-row border-2 border-slate-900 h-[12.6rem] my-[1rem] rounded-lg`,
    nftSalePrice: `flex items-center justify-center w-[80%] h-full px-4`,
    nftSaleButton: `flex flex-reverse justify-end items-end w-[20%] h-full`,
    nftOfferWrapper: `border-2 border-slate-900 h-[200px] my-[1rem] rounded-lg`,
    title: `font-mono text-black text-4xl text-slate-900 `,
    description: `font-mono font-semibold text-sm text-slate-700 mb-[4rem]`,
    accentedButton: `flex justify-center items-center m-[0.4rem] w-[80px] h-[40px] relative text-lg font-mono font-semibold bg-black bg-slate-900 rounded-lg text-white hover:bg-slate-800 cursor-pointer`,
    inputLabel: `relative my-[0.5rem]`,
    inputItem: `h-10 w-[500px] border-2 p-3 border-slate-700 rounded-lg outline-none`,
    spanItem: `font-mono font-semibold text-sm text-slate-700 bg-white absolute left-1 -top-3 mx-2 px-1 py-0 `,
}

const fetchData = async (_authorId, _tokenId) => {
    const { data } = await axios.get(`http://api.nftpinas.io/v1/nfts/${_authorId}/${_tokenId}`)
    return data
}


const AuthorId = () => {
    const router = useRouter()
    const { authorId, tokenId } = router.query
    const [ showModal, setShowModal ] = useState(false)
    const [ price, setPrice ] = useState(0)
    //const [ marketplace, setMarketplace ] = useState({})
    const { initializeContract, listItem, buyNFT, marketplace } = useContext(MarketplaceContext)

    const _authorId = typeof router.query?.authorId === "string" ? router.query.authorId : "";
    const _tokenId = typeof router.query?.tokenId === "string" ? router.query.tokenId : "";

    const { data, isLoading, isFetching } = useQuery(["getNft", _authorId, _tokenId], () => fetchData(_authorId, _tokenId), {
        enabled: true
    })

    useEffect(() => {
        initializeContract()
    }, []);
    

    if (isLoading) {
        return <div className="center">Loading...</div>;
    }

    if (!data) return <div>No Data Found</div>

    return (
        <>
            {data.data.map((item) =>{
                return (
                    <div className={style.container}>
                        <div key={item.tokenId} className={style.subContainer}>
                            <div className={style.nftImgWrapper}>
                                <div className={style.nftImg}>
                                    <Image
                                        src={item.metadata.image}
                                        alt="Picture of NFT"
                                        className="relative rounded-xl"
                                        layout='fill'
                                    />
                                    <div className='absolute top-[1rem] ml-[1rem]'>
                                        <div className={style.nftId}>NFT ID: #{item.tokenId}</div>
                                    </div>
                                </div>
                                <div className={style.nftInfoWrapper}>
                                        <p className='font-mono text-sm font-bold text-black text-slate-600'>Owner: <span className='font-semibold text-slate-900'>{item.owner_address}</span></p>
                                        <p className='font-mono text-sm font-bold text-black text-slate-600'>Origin: <span className='font-semibold text-slate-900'>{item.contract_address}</span></p>
                                </div>
                            </div>  
                            <div className={style.nftCardWrapper}>
                                <h1 className={style.title}>{item.metadata.name} #{item.tokenId}</h1>
                                <p className={style.description}>{item.metadata.description}</p>
                                <div className={style.nftSaleWrapper}>
                                        { item.isListed === true ? (
                                            <>
                                            <div className={style.nftSalePrice}><h1 className={style.title}><span className='flex'><FaEthereum />{item.price} ETH</span></h1></div>
                                            <div className={style.nftSaleButton}>
                                                <Button onClick={()=> buyNFT(item.tokenId, item.price) } variant="primary" size="lg">
                                                    <div className={style.accentedButton}><FaShoppingCart className='m-1'/>Buy</div>
                                                </Button>
                                            </div>
                                            </>
                                            
                                        ) : (
                                            <>
                                            <div className={style.nftSalePrice}>
                                                <h1 className={style.title}>
                                                    <span className='flex m-[2rem]'>This item is not listed yet.</span>
                                                    <label className={style.inputLabel}>
                                                        <input type="number" onChange={(e) => setPrice(e.target.value)} className={style.inputItem} />
                                                        <span className={style.spanItem}>Price</span>
                                                    </label>
                                                </h1>
                                            </div>
                                            <div className={style.nftSaleButton}>
                                                <Button onClick={()=> listItem(price, _tokenId, _authorId) } variant="primary" size="lg">
                                                    <div className={style.accentedButton}><FaShoppingCart className='m-1'/>List</div>
                                                </Button>
                                            </div>
                                            </>
                                        )}
                                </div>
                            </div>                          
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default AuthorId