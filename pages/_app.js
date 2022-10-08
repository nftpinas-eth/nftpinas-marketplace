import '../styles/globals.css'
import { Contract, ethers } from 'ethers'
import { useState, useEffect } from 'react'
import MarketplaceABI from "../contractsABI/Marketplace.json"
import MintABI from "../contractsABI/Mint.json"
import Header from "../components/Header"
import { marketplaceAddress, mintAddress } from '../config'

function MyApp({ Component, pageProps }) {
  const [marketplace, setMarketplace] = useState({})
  const [nft, setNFT] = useState({})
  const [walletAccount, setWalletAccount] = useState(null)
  const [walletStatus, setWalletStatus] = useState(false)


  useEffect(() => {

  }, [])

  // Provider and Signer
  const handler = async () => {
    // Check if MetaMask is installed.
    if (window.ethereum) {

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
            setWalletAccount(accounts[0])
        } catch (error) {
            console.log("Error", error)
        }

    } else {
        alert("Please install MetaMask")
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    
    loadContracts(signer)

  }


  const loadContracts = async (signer) => {
    const marketplace =  new ethers.Contract(marketplaceAddress, MarketplaceABI.abi, signer);
    setMarketplace(marketplace)
    const nft =  new ethers.Contract(mintAddress, MintABI.abi, signer)
    setNFT(nft)

  };


  return (
      <Component {...pageProps} handler={handler} walletAccount={walletAccount} nft={nft} marketplace={marketplace} />
  )
}

export default MyApp
