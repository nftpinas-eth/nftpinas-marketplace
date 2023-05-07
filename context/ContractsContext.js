import React, { createContext, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { mintingContractAddress, mintingContractAbi } from "./ContextConfig";
import { marketplaceContractAddress, marketplaceContractAbi } from "./ContextConfig";
import { WalletContext } from "./WalletContext";

const ContractsContext = createContext();

const ContractsContextProvider = ({ children }) => {
  const [ mintingContract, setMintingContract ] = useState(null);
  const [ marketplaceContract, setMarketplaceContract]  = useState(null);
  const { provider, signer } = useContext(WalletContext);

  useEffect(() => {
    const initContracts = async () => {
      if (provider && signer) {
        const mintingContractInstance = new ethers.Contract(
          mintingContractAddress,
          mintingContractAbi.abi,
          signer
        );
        setMintingContract(mintingContractInstance);

        const marketplaceContractInstance = new ethers.Contract(
          marketplaceContractAddress,
          marketplaceContractAbi.abi,
          signer
        );
        setMarketplaceContract(marketplaceContractInstance);
      }
    };

    initContracts();
  }, [provider, signer]);

  return (
    <ContractsContext.Provider value={{ mintingContract, marketplaceContract }}>
      {children}
    </ContractsContext.Provider>
  );
};

export { ContractsContext, ContractsContextProvider };

