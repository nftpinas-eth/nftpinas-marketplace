import '../styles/globals.css'
import React from 'react'
import { useEffect } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MarketplaceProvider } from '../context/MarketplaceContext'


function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())

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


  return (
    <QueryClientProvider client={queryClient}>
      <MarketplaceProvider>
      <div className="flex flex-col min-h-screen bg-[#1F1D1B]">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
        <Component {...pageProps} />
        </main>
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </MarketplaceProvider>
   </QueryClientProvider>
  )
}

export default MyApp
