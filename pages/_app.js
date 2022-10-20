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
    const checkProvider = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x118' }], 
          });
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
      }
    }
  }, [])

  // Provider and Signer
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
          const marketplace =  new ethers.Contract(marketplaceAddress, MarketplaceABI.abi, signer);
          const nft =  new ethers.Contract(mintAddress, MintABI.abi, signer)
          setMarketplace(marketplace)
          setNFT(nft)
        } catch (error) {
          console.log(error)
        }
      } else {
        alert("Connect to zkSync Network")
      }
    }
  }



  return (
      <Component {...pageProps} initializeWallet={initializeWallet} initializeContract={initializeContract} nft={nft} marketplace={marketplace} />
  )
}

export default MyApp
