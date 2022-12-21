import React,  {useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Router from 'next/router'

// Contract Address and ABI Code Import
import { marketplaceAddress } from '../config'
import MarketplaceABI from "../contractsABI/Marketplace.json"

// Infura Client Import
import { client } from "../lib/infura_client";



export const MarketplaceContext = React.createContext()

export const MarketplaceProvider = (({children}) => {
  const [ marketplace, setMarketplace ] = useState({})
  const [ address, setAddress ] = useState("")


  // Initialize Contract
  const initializeContract = async () => {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ 
        "jsonrpc": "2.0",
        "method": "eth_chainId",
        "params": [],
        "id": 0
      });
      if (chainId === "0x118") {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const marketplace =  new ethers.Contract(marketplaceAddress, MarketplaceABI.abi, signer)
          setMarketplace(marketplace)
        } catch (error) {
          console.log(error)
        }
      } else {
        alert("Connect to zkSync Network")
      }
    }
  }

  // Connect and Initialize Wallet
  const initializeWallet = async () => {
    console.log("handler triggered")
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ 
        "jsonrpc": "2.0",
        "method": "eth_chainId",
        "params": [],
        "id": 0
      });

      if (chainId === "0x118") {
        try{
          console.log(true)
          const account = await window.ethereum.request({ 
            method: 'eth_requestAccounts'
          });
          console.log(chainId)
        }catch (error) {
            console.log(error)
            console.log('false')
        }

      }
    } else {
        alert("Please install MetaMask")
    }
    
  }

  const connectWallet = async () => {
    
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x118' }], 
        });

        const account = await window.ethereum.request({ 
          method: 'eth_requestAccounts'
        });
        setAddress(account[0])
        console.log(account[0])

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
            });
          } catch (error) {
            console.log(error);
          }
        }

      }
    } else {
      alert("Please install MetaMask")
  }
  

  window.ethereum.on('chainChanged', (chainId) => {
    window.location.reload();
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

      await axios.post(`http://api.nftpinas.io/v1/nfts/${_authorId}/${_tokenId}`, {
        isListed: true,
        price: _price
      })


    } catch (error) {
        console.log(error)
    }
  }

  // Mint Item from the Marketplace
  const mintNFT = async (image, name, description, trait_type, _alue) => {
    if ( !image || !name || !description ) return alert("Please fill out the missing field.")

    try {
        const attributes = [{ trait_type, value }]
        const result = await client.add(JSON.stringify({image, name, description, attributes}))
        const uri = `https://nftpinas.infura-ipfs.io/ipfs/${result.path}`
        const mintItem = await marketplace.mintItem(uri)
    } catch (error) {
        console.log("Error Minting Item", error)
    }
}

  return (
    <MarketplaceContext.Provider value={{initializeContract, listItem, mintNFT, connectWallet, address}}>
      {children}
    </MarketplaceContext.Provider>
  )
})
