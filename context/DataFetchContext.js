import React, { createContext, useState, useContext } from "react";
import { ethers } from "ethers";
import { ContractsContext } from "./ContractsContext";
import axios from "axios";

const DataFetchContext = createContext();

const DataFetchProvider = ({ children }) => {
  const { marketplaceContract } = useContext(ContractsContext);
  const [ marketplaceData, setMarketplaceData ] = useState([]);

  const fetchMarketItems = async () => {
    try {
      const data = await marketplaceContract.fetchMarketItems();
      const items = await Promise.all(
        data.map(async ({ itemId, tokenId, seller, owner, price: unformattedPrice }) => {
          const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");
          await axios.patch(`https://api.nftpinas.io/v1/nfts?tokenId=${tokenId}`, {
            isListed: true,
            price: price,
            marketId: itemId.toNumber(),
          });
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const convertString = (convert) => async (_tokenId) => {
    if (convert === "owner") {
      const owner = await marketplaceContract.ownerOf(_tokenId);
      return owner.toLowerCase();
    }
  };

  const fetchAllNfts = async () => {
    const tokenCount = await marketplaceContract.tokenIds();
    const tokenId = tokenCount.toNumber();
    const fetchResponse = await axios.get("https://api.nftpinas.io/v1/nfts/");
    const fetchResult = fetchResponse.data.result;

    const promises = [];
    for (let i = fetchResult + 1; i <= tokenId; i++) {
      const owner = await convertString("owner")(i);
      const uri = await marketplaceContract.tokenURI(i);
      promises.push(Promise.all([owner, i, uri, axios.get(uri)]));
    }
    const responses = await Promise.all(promises);
    const postData = responses.map(([owner, i, uri, { data }]) => {
      return {
        owner_address: owner,
        tokenId: i,
        tokenUri: uri,
        isListed: false,
        contract_address: contract.address.toLowerCase(),
        metadata: {
          image: data.image,
          name: data.name,
          description: data.description,
        },
      };
    });

    const postPromises = postData.map((data) => axios.post("https://api.nftpinas.io/v1/nfts/", data));
    await Promise.all(postPromises);
  };

  return (
    <DataFetchContext.Provider
      value={{ fetchMarketItems, fetchAllNfts, marketplaceData, setMarketplaceData }}
    >
      {children}
    </DataFetchContext.Provider>
  );
};

export { DataFetchContext, DataFetchProvider };
