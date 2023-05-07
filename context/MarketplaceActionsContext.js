import React, { createContext, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { ContractsContext } from "./ContractsContext";
import { client } from "../lib/infura_client"

const MarketplaceActionsContext = createContext();

const MarketplaceActionsProvider = ({ children }) => {
  const { marketplaceContract, mintingContract } = useContext(ContractsContext);

  // List Item to the Marketplace
  const listItem = async (_price, _tokenId, _authorId) => {
    if (!_price) return alert("Please put the price");
    const nftId = _tokenId * 1;

    try {
      await marketplaceContract.setApprovalForAll(marketplaceAddress, true);
      const listingPrice = ethers.utils.parseUnits(_price.toString(), 'ether');
      await contract.listItem(nftId, listingPrice);
    } catch (error) {
      console.log(error);
    }
  };

  // Mint Item from the Marketplace
  const mintNFT = async (image, name, description, traitTypeInputs) => {
    if (!image || !name || !description) return alert("Please fill out the missing field.");
    //console.log(traitTypeInputs);

    if (traitTypeInputs.some(input => !input.trait_type || !input.value)) {
      return alert("Please fill out the missing field for trait and value.");
    }

    try {
      const result = await client.add(JSON.stringify({ image, name, description, attributes: traitTypeInputs }));
      const uri = `https://nftpinas.infura-ipfs.io/ipfs/${result.path}`;
      const mintItem = await mintingContract.safeMint(uri);
      console.log(mintItem)
    } catch (error) {
      console.log("Error Minting Item", error);
    }
  };

  const buyNFT = async (_itemId, _tokenId, _price) => {
    try {
      const price = ethers.utils.parseEther(_price.toString(), "ether");
  
      // Call the buyItem function on the contract
      const transaction = await marketplaceContract.buyItem(_itemId, { value: price });
  
      // Wait for the transaction to be mined
      await transaction.wait();
  
      // Get the owner address of the NFT tokenId
      const ownerAddress = await marketplaceContract.ownerOf(_tokenId);
  
      // Update the owner address in the API
      await axios.patch(`https://api.nftpinas.io/v1/nfts?tokenId=${_tokenId}`, {
        owner_address: ownerAddress.toLowerCase(),
        isListed: false,
      });
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MarketplaceActionsContext.Provider
      value={{ listItem, mintNFT, buyNFT }}
    >
      {children}
    </MarketplaceActionsContext.Provider>
  );

}

export { MarketplaceActionsContext, MarketplaceActionsProvider };
