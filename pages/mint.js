import React, { useState, useEffect, useContext } from 'react'
import { Button } from 'react-bootstrap'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import { client } from "../lib/infura_client";

// Marketplace Context Import
import { MarketplaceContext } from '../context/MarketplaceContext'


// CSS Style
const style = {
    mainContainer: `flex flex-row justify-center items-center`,
    mainSubContainer: `flex flex-col w-[100vw] h-[50vw] my-[4rem] mx-[25rem]`,
    title: `font-mono font-black text-4xl text-slate-900 `,
    subTitle: `font-mono font-black text-lg text-slate-900 mt-[2rem]`,
    description: `font-mono font-semibold text-sm text-slate-700`,
    uploadContainer: `flex shrink-0 justify-center items-center w-[350px] h-[350px] p-[1.5rem] rounded-lg border-2 border-slate-700 border-dashed cursor-pointer`,
    uploadInfo: `font-mono font-semibold text-sm text-slate-700`,
    input: ``,
    thumbnail: `w-[100%] h-[100%] rounded-lg overflow-hidden relative`,
    thumbnailInfo: `absolute bottom-0 left-0 w-[100%] text-center`,
    formContainer: `flex flex-col`,
    inputLabel: `relative my-[0.5rem]`,
    inputItem: `h-10 w-[500px] border-2 p-3 border-slate-700 rounded-lg outline-none`,
    spanItem: `font-mono font-semibold text-sm text-slate-700 bg-white absolute left-1 -top-2 mx-2 px-1 py-0 `,
    ctaContainer: `flex`,
    accentedButton: `flex justify-center items-center w-[80px] h-[40px] relative text-lg font-mono font-semibold bg-black bg-slate-900 rounded-lg text-white hover:bg-slate-800 cursor-pointer`,
}


const Mint = () => {
    const { initializeContract, mintNFT } = useContext(MarketplaceContext)
    const [ file, setFile ] = useState('')
    const [ url, setUrl ] = useState([])
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ trait_type, setTraitType ] = useState('')
    const [ value, setValue ] = useState('')
    const [ imagePreview, setImagePreview ] = useState(false)
    const [ image, setImage ] = useState('')

    const uploadToIPFS = async (e) => {
        e.preventDefault()
        let file = e.target.files[0];
        const fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg'];

        if (validImageTypes.includes(fileType) && typeof file !== 'undefined') {            
            try {
                const fileUrl = URL.createObjectURL(e.target.files[0])
                setFile(file);
                setUrl(fileUrl)
                setImagePreview(true)
                const result = await client.add(file)
                setImage(`https://nftpinas.infura-ipfs.io/ipfs/${result.path}`)
                initializeContract()
            }
            catch (error) {
                alert("Error Uploading Image", error)
            }
        } else {
            alert("Invalid File Type or Undefined")
        }
    };

    // const mintNFT = async () => {
    //     if ( !image || !name || !description ) return alert("Please fill out the missing field.")

    //     try {
    //         const attributes = [{ trait_type, value }]
    //         const result = await client.add(JSON.stringify({image, name, description, attributes}))
    //         const uri = `https://nftpinas.infura-ipfs.io/ipfs/${result.path}`
    //         const mintItem = await marketplace.mintItem(uri)
    //     } catch (error) {
    //         console.log("Error Minting Item", error)
    //     }
    // }

  return (
    <>
     <div className={style.mainContainer}>
        <div className={style.mainSubContainer}>
            <h1 className={style.title}>Mint NFT</h1>
            <p className={style.description}>Create and Mint your NFT on Layer 2.</p>
            <h2 className={style.subTitle}> Upload Media *</h2>
            <p className={style.description}>Max: 50MB | Supported File Type: JPEG, GIF, PNG and SVG.</p>
            <label htmlFor="file" className={style.uploadContainer}>
                { !imagePreview ? (
                <span className={style.uploadInfo}> Drop or Upload Media </span>
                ) : (
                    <div className={style.thumbnail}>
                    <Image
                      src={url}
                      alt="Image Preview"
                      layout="fill"
                    />
                    {/*<img src={url} alt="Preview Picture" className='w-[100%] h-[100%]'/>
                     <div className={style.thumbnailInfo}>test</div> */}
                </div>
                )}

                <input type="file" id="file" onChange={uploadToIPFS} className='hidden'/>
            </label>
            <h2 className={style.subTitle}> General</h2>
            <div className={style.formContainer}>
                <label className={style.inputLabel}>
                    <input type="text" onChange={(e) => setName(e.target.value)} className={style.inputItem} />
                    <span className={style.spanItem}>Name</span>
                </label>
                <label className={style.inputLabel}>
                    <input type="text-area" onChange={(e) => setDescription(e.target.value)} className={style.inputItem} />
                    <span className={style.spanItem}>Description</span>
                </label>
            <h2 className={style.subTitle}> Attributes</h2>
                <label className={style.inputLabel}>
                    <input type="text" onChange={(e) => setTraitType(e.target.value)} className={style.inputItem} />
                    <span className={style.spanItem}>Trait Type</span>
                </label>
                <label className={style.inputLabel}>
                    <input type="text" onChange={(e) => setValue(e.target.value)} className={style.inputItem} />
                    <span className={style.spanItem}>Value</span>
                </label>
                <div className={style.ctaContainer}>
                    <Button onClick={() => mintNFT(image, name, description, trait_type, value)} variant="primary" size="lg">
                        <div className={style.accentedButton}>
                            Mint
                        </div>
                    </Button>
                </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default Mint