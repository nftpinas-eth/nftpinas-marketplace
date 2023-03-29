import React,  {useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Router from 'next/router'
import { Provider } from "zksync-web3"

// Contract Address and ABI Code Import
import { marketplaceAddress } from '../config'
import MarketplaceABI from "../contractsABI/Marketplace.json"

// Infura Client Import
import { client } from "../lib/infura_client"
import axios from 'axios'

export const MarketplaceContext = React.createContext()
export const MarketplaceProvider = (({children}) => {
  const [ marketplace, setMarketplace ] = useState({})
  const [ address, setAddress ] = useState("")
  const [marketplaceData, setMarketplaceData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  let lastProcessedId = 0

  const fetchContract = (signerOrProvider) => new ethers.Contract(marketplaceAddress, MarketplaceABI.abi, signerOrProvider)

  // Initialize Contract
  const initializeContract = async () => {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ 
        "jsonrpc": "2.0",
        "method": "eth_chainId",
        "params": [],
        "id": 0
      })
      if (chainId === "0x118") {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const marketplace =  fetchContract(signer)
          setMarketplace(marketplace)
        } catch (error) {
          console.log(error)
        }
      } else {
        alert("Connect to zkSync Network")
      }
    }
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x118' }], 
        })

        const account = await window.ethereum.request({ 
          method: 'eth_requestAccounts'
        })
        setAddress(account[0])
       // console.log(account[0])

      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {   
                  chainId: '0x118',
                  chainName: 'zkSync alpha testnet',
                  rpcUrls: ['https://zksync2-testnet.zksync.dev'],
                  nativeCurrency: {
                      name: "zkSync ETH",
                      symbol: "ETH",
                      decimals: 18
                  },
                  blockExplorerUrls: ["https://explorer.zksync.io/"]
                },
              ],
            })
          } catch (error) {
            console.log(error)
          }
        }

      }
    } else {
      alert("Please install MetaMask")
  }
  

  window.ethereum.on('chainChanged', (chainId) => {
    window.location.reload()
  })

  window.ethereum.on('accountsChanged', async function (account) {
    setAddress(account[0])
    //setAccountStatus(true)
    await connectWallet()
  })

  }

  // List Item to the Marketplace
  const listItem = async (_price, _tokenId, _authorId) => {
    if (!_price) return alert("Please put the price")
    const nftId = _tokenId * 1

    try {
      await marketplace.setApprovalForAll(marketplaceAddress, true)
      const listingPrice = ethers.utils.parseUnits(_price.toString(), 'ether')
      await marketplace.listItem(nftId, listingPrice)

      // await axios.patch(`http://api.nftpinas.io/v1/nfts/${_authorId}/${_tokenId}`, {
      //   isListed: true,
      //   price: _price
      // })

    } catch (error) {
        console.log(error)
    }
  }

  // Mint Item from the Marketplace
  const mintNFT = async (image, name, description, traitTypeInputs) => {
    if ( !image || !name || !description ) return alert("Please fill out the missing field.")
    console.log(traitTypeInputs)

    if (traitTypeInputs.some(input => !input.trait_type || !input.value)) {
      return alert("Please fill out the missing field for trait and value.");
    }

    try {
        const result = await client.add(JSON.stringify({image, name, description, attributes: traitTypeInputs}))
        console.log(result)
        const uri = `https://nftpinas.infura-ipfs.io/ipfs/${result.path}`
        const mintItem = await marketplace.mintItem(uri)
    } catch (error) {
        console.log("Error Minting Item", error)
    }
  }

  const buyNFT = async (_itemId, _tokenId, _price) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = fetchContract(signer)
      const price = ethers.utils.parseEther(_price.toString(), "ether")
  
  
      // Call the buyItem function on the contract
      const transaction = await contract.buyItem(_itemId, { value: price })
  
      // Wait for the transaction to be mined
      await transaction.wait()

      // Get the owner address of the NFT tokenId
      const ownerAddress = await contract.ownerOf(_tokenId)

      // Update the owner address in the API
      await axios.patch(`https://api.nftpinas.io/v1/nfts?tokenId=${_tokenId}`, {
        owner_address: ownerAddress.toLowerCase(),
        isListed: false,
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMarketItems = async () => {
    try {
      const provider = new Provider("https://zksync2-testnet.zksync.dev")
      const contract = fetchContract(provider)
      const data = await contract.fetchMarketItems()
      const items = await Promise.all(
        data.map(
          async ({ itemId, tokenId, seller, owner, price: unformattedPrice}) => {

            const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether')
            const response = await axios.patch(`https://api.nftpinas.io/v1/nfts?tokenId=${tokenId}`, {
              isListed: true,
              price: price,
              marketId: itemId.toNumber()
            })
          } 

        )
      )
      } catch (err) {
        console.log(err)
    }
  }

  const convertString = ( convert, contract ) => async (_tokenId) => {
    if(convert === 'owner'){
      const owner = await contract.ownerOf(_tokenId)
      return owner.toLowerCase()
    }
  }

  const fetchAllNfts = async () => {
    const provider = new Provider("https://zksync2-testnet.zksync.dev")
    const contract =  new ethers.Contract(marketplaceAddress, MarketplaceABI.abi, provider)
    const tokenCount = await contract.tokenIds()
    const tokenId = tokenCount.toNumber()
    const fetchResponse = await axios.get("https://api.nftpinas.io/v1/nfts/")
    const fetchResult = fetchResponse.data.result
    //check if there is new items
    const promises = []
    //fetch new item only
    for (let i = fetchResult+1; i <= tokenId; i++) {
      const owner = await convertString('owner', contract)(i)
      const uri = await contract.tokenURI(i)
      promises.push(Promise.all([owner, i, uri, axios.get(uri)]))
    }
    const responses = await Promise.all(promises)
    const postData = responses.map(([owner, i, uri, {data}]) => {
      return { 
        owner_address: owner, 
        tokenId: i,
        tokenUri: uri,
        isListed: false,
        contract_address: contract.address.toLowerCase(),
        metadata: {
          image: data.image, 
          name: data.name, 
          description: data.description
        }
      }
    })
    
    // POST the NFT data to the API
    const postPromises = postData.map((data) => axios.post("https://api.nftpinas.io/v1/nfts/", data))
    await Promise.all(postPromises)
  }
  
  return (
    <MarketplaceContext.Provider value={{initializeContract, listItem, mintNFT, buyNFT, connectWallet, fetchMarketItems, fetchAllNfts, address, marketplaceData, setMarketplaceData}}>
      {children}
    </MarketplaceContext.Provider>
  )
})
