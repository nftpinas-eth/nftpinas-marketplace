import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x118" }],
        });

        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(account[0]);

        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
        const web3Signer = web3Provider.getSigner();
        setSigner(web3Signer);
        localStorage.setItem("walletAddress", account[0]);

      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x118",
                  chainName: "zkSync alpha testnet",
                  rpcUrls: ["https://zksync2-testnet.zksync.dev"],
                  nativeCurrency: {
                    name: "zkSync ETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://explorer.zksync.io/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  // useEffect(() => {
  //   const handleChainChanged = () => {
  //     window.location.reload();
  //   };
  
  //   const handleAccountsChanged = async (accounts) => {
  //     setAddress(accounts[0]);
  //     await connectWallet();
  //   };
  
  //   if (window.ethereum) {
      
  //     window.ethereum.on("chainChanged", handleChainChanged);
  //     window.ethereum.on("accountsChanged", handleAccountsChanged);
  
  //     return () => {
  //       if (window.ethereum) {
  //         window.ethereum.removeListener("chainChanged", handleChainChanged);
  //         window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
  //       }
  //     };
  //   }
  // }, []);

  useEffect(() => {
    // Load the address from localStorage
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress) {
      setAddress(storedAddress);

      // Initialize provider and signer with the stored address
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
      const web3Signer = web3Provider.getSigner();
      setSigner(web3Signer);
    }

    const handleChainChanged = () => {
      window.location.reload();
    };

    const handleAccountsChanged = async (accounts) => {
      setAddress(accounts[0]);
      await connectWallet();
    };

    if (window.ethereum) {
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener("chainChanged", handleChainChanged);
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, []);


  return (
    <WalletContext.Provider value={{ connectWallet, address, provider, signer }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
