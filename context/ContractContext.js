import React, { createContext, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { contract_address, contract_abi } from "../context/ContextConfig";
import { WalletContext } from "./WalletContext";

const ContractContext = createContext();

const ContractContextProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const { provider, signer } = useContext(WalletContext);

  useEffect(() => {
    const initContract = async () => {
      if (provider && signer) {
        const contractInstance = new ethers.Contract(
          contract_address,
          contract_abi.abi,
          signer
        );
        setContract(contractInstance);
      }
    };

    initContract();
  }, [provider, signer]);

  return (
    <ContractContext.Provider value={{ contract }}>
      {children}
    </ContractContext.Provider>
  );
};

export { ContractContext, ContractContextProvider };
