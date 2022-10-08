import React from 'react'
import { useRouter  } from 'next/router' 
import { Row, Button } from 'react-bootstrap'
import { Contract, ethers } from 'ethers'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Buffer } from 'buffer';
import { create as  ipfsClient } from "ipfs-http-client" 
import { BiWindows } from 'react-icons/bi'
import Link from "next/link";
import { marketplaceAddress, mintAddress } from '../config'

// CSS Style
const style = {
    contentWrapper: `flex justify-center items-center flex-col w-full`,
    contentItems: `flex flex-col justify-center items-center`,
    formItems: ` w-full flex h-[2.5rem] px-[1rem] my-[0.5rem] border-[1.5px] rounded-[0.5rem] hover:bg-[#EEEEEF] border-black`,
    formFile: `flex items-center justify-center border-[1px] border-dashed border-black display-none h-[8rem] rounded-[0.5rem]`,
    ctaContainer: `flex`,
    accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
    inputFile: `inset-0 z-50 m-0 p-0 w-full h-full outline-none opacity-0`,
    inputFileContainer: `flex flex-col justify-center items-center p-10 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-white-800 dark:bg-white-700 hover:bg-gray-100 dark:border-white-600 dark:hover:border-gray-500 dark:hover:bg-white-600`,
    inputFileSubContainer: `flex flex-col justify-center items-center`,
    inputLabel: `relative m-[0.5rem]`,
    inputItem: `h-10 w-[50] border-2 p-3 border-gray-300 rounded-lg outline-none focus:border-gray-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200`,
    spanItem: `text-md text-gray-500 bg-white absolute left-1 top-1.5 mx-2 px-1 py-0 transition duration-200 input-text`,

};


const Mint = ({ handler, nft }) => {

    const [image, setImage] = useState('')
    const [price, setPrice] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const uploadToIPFS = async (event, signer) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (typeof file !== 'undefined') {
            try {
                const result = await client.add(file)
                console.log(result)
                setImage(`https://nftpinas.infura-ipfs.io/ipfs/${result.path}`)
                handler()
            }
            catch (error) {
                console.log("Error Uploading Image", error)
            }
        }
    }

    const mintNFT = async () => {
        if (!image || !name || !description) return alert("Please fill out the missing field.")

        try {
            const result = await client.add(JSON.stringify({image, name, description}))
            const uri = `https://nftpinas.infura-ipfs.io/ipfs/${result.path}`
            const mintItem = await nft.mintItem(uri)

        } catch (error) {
            console.log("Error Minting Item", error)
        }
    }

    return(
        <>
        <Header />
        <div className={style.contentWrapper}>
            <h1>Mint NFT</h1>
            <Row className={style.contentItems}>
                <label>Upload Media</label>
                <label for="dropzone-file" className={style.inputFileContainer}>
                    <div className={style.inputFileSubContainer}>
                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Drop Media</span> or Upload</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SUPPORTED FILE: SVG, PNG, JPG or GIF (MAX 50MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" onChange={uploadToIPFS} className="hidden"></input>
                </label>
                <label className={style.inputLabel}>
                    <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} className={style.inputItem} />
                    <span className={style.spanItem}>Name</span>
                </label>
                <label className={style.inputLabel}>
                    <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} className={style.inputItem} />
                    <span className={style.spanItem}>Description</span>
                </label>
                <div className={style.ctaContainer}>
                <div className={style.accentedButton}>
                    <Button onClick={mintNFT} variant="primary" size="lg">
                    Mint
                    </Button>
                </div>
                </div>
            </Row>
        </div>
        <Footer/>
        </>
    );
}

export default Mint