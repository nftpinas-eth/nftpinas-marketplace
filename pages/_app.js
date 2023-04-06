import '../styles/globals.css'
import React from 'react'
import { useEffect } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { WalletProvider } from "../context/WalletContext";
import { ContractContextProvider } from "../context/ContractContext";
import { MarketplaceActionsProvider } from "../context/MarketplaceActionsContext";
import { DataFetchProvider } from "../context/DataFetchContext";

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <ContractContextProvider>
          <MarketplaceActionsProvider>
            <DataFetchProvider>
              <div className="flex flex-col min-h-screen bg-[#1F1D1B]">
                <Header />
                  <main className="flex-grow container mx-auto px-4 py-8">
                    <Component {...pageProps} />
                  </main>
                <Footer />
                <ReactQueryDevtools initialIsOpen={false} />
              </div>
            </DataFetchProvider>
          </MarketplaceActionsProvider>
        </ContractContextProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
