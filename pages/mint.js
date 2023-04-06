import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Input from '../components/Input/input'
import Button from '../components/Buttons/button'
import { client } from "../lib/infura_client"

// Marketplace Context Import
import { MarketplaceActionsContext } from '../context/MarketplaceActionsContext'

const Mint = () => {
    const { mintNFT } = useContext(MarketplaceActionsContext)
    const [ file, setFile ] = useState('')
    const [ url, setUrl ] = useState([])
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ imagePreview, setImagePreview ] = useState(false)
    const [ image, setImage ] = useState('')
    const [ traitTypeInputs, setTraitTypeInputs ] = useState([{ trait_type: "", value: "" }])

    const uploadToIPFS = async (e) => {
        e.preventDefault()
        let file = e.target.files[0]
        const fileType = file['type']
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg']

        if (validImageTypes.includes(fileType) && typeof file !== 'undefined') {            
            try {
                const fileUrl = URL.createObjectURL(e.target.files[0])
                setFile(file)
                setUrl(fileUrl)
                setImagePreview(true)
                const result = await client.add(file)
                setImage(`https://nftpinas.infura-ipfs.io/ipfs/${result.path}`)
            }
            catch (error) {
                alert("Error Uploading Image", error)
            }
        } else {
            alert("Invalid File Type or Undefined")
        }
    }

    const handleAddTraitTypeInput = () => {
      setTraitTypeInputs([...traitTypeInputs, { trait_type: "", value: "" }])
    }
  
    const handleRemoveTraitTypeInput = (index) => {
      setTraitTypeInputs(traitTypeInputs.filter((_, i) => i !== index))
    }
  
    const handleTraitTypeChange = (index, e) => {
      const newTraitTypeInputs = [...traitTypeInputs]
      newTraitTypeInputs[index].trait_type = e.target.value
      setTraitTypeInputs(newTraitTypeInputs)
    }
  
    const handleValueChange = (index, e) => {
      const newTraitTypeInputs = [...traitTypeInputs]
      newTraitTypeInputs[index].value = e.target.value
      setTraitTypeInputs(newTraitTypeInputs)
    }

  return (
     <div className="bg-[#1F1D1B] w-full flex">
        <div className="flex-row mx-auto">
            <h1 className="font-mono text-white text-4xl">Mint NFT</h1>
            <p className="font-mono text-white font-semibold text-sm text-slate-300">Create and Mint your NFT on Layer 2.</p>
            <h2 className="font-mono text-white text-lg mt-[2rem]"> Upload Media *</h2>
            <p className="font-mono text-white font-semibold text-sm text-slate-300">Max: 50MB | Supported File Type: JPEG, GIF, PNG and SVG.</p>
            <label htmlFor="file" className="flex shrink-0 justify-center items-center w-[350px] h-[350px] p-[1.5rem] rounded-lg border-2 border-[#DD9F00] border-dashed cursor-pointer">
                { !imagePreview ? (
                <span className="font-mono font-semibold text-sm text-[#DD9F00]"> Drop or Upload Media </span>
                ) : (
                    <div className="w-[100%] h-[100%] rounded-lg overflow-hidden relative">
                    <Image
                      src={url}
                      alt="NFT Card Preview"
                      layout="fill"
                    />
                </div>
                )}

                <input type="file" id="file" onChange={uploadToIPFS} className='hidden'/>
            </label>
            <h2 className="font-mono text-white text-lg mt-[2rem]"> General</h2>
            <div className="flex flex-col">
                <Input size={350} label={'Name'} value={name} onChange={(e) => setName(e.target.value)}/>
                <Input size={350} label={'Description'} value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <h2 className="font-mono text-white text-lg mt-[2rem]"> Attributes</h2>
            <div className=''>
            {traitTypeInputs.map((input, index) => (
                <div key={index} className='flex flex-shrink-0'>
                        <Input
                        label={"Type"}
                        size={80}
                        value={input.trait_type}
                        onChange={(e) => handleTraitTypeChange(index, e)}
                        />
                        
                        <Input
                            label={"Value"}
                            size={50}
                            value={input.value}
                            onChange={(e) => handleValueChange(index, e)}
                            />
                        <Button size={40} shape="round" label="+" onClick={handleAddTraitTypeInput} />
                        {index > 0 && (
                            
                            <Button size={40} shape="round" label="-" c onClick={() => handleRemoveTraitTypeInput(index)} />
                            
                            )}
                </div>
            ))}
                <Button height={50} width={80} shape="square" label="Mint" onClick={() => mintNFT(image, name, description, traitTypeInputs)} />
            </div>
            
        </div>
     </div>
  )
}

export default Mint