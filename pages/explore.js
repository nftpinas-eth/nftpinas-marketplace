import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NftCard from '../components/NFTCard/nftcard';
import LoadingPage from '../components/Loading/new_loading';
import { useRouter } from 'next/router';
import Pagination from '../components/Pagination/pagination';

export async function getServerSideProps(context) {
  const currentPage = context.query.page ? parseInt(context.query.page) : 1;
  const nftsPerPage = 100;
  const offset = (currentPage - 1) * nftsPerPage;

  const { data } = await axios.get('https://api.nftpinas.io/v1/nfts/zksync-testnet', {
    params: {
      offset: offset,
      limit: nftsPerPage,
    },
  });

  return {
    props: {
      data: data,
      currentPage: currentPage,
    },
  };
}

const Explore = ({ data, currentPage }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const clickOnNft = (_address, _tokenId) => {
    router.push(`/asset/${_address}/${_tokenId}`);
  };

  if (!data) {
    return <LoadingPage />;
  }

  const nftData = data.data;

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {nftData.length ? (
            <div className="bg-[#1F1D1B] w-full flex flex-row">
              <div className="w-full grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4 m-[5rem] mx-auto">
                {nftData.map((nft) => (
                  <NftCard
                  key={nft.tokenId}
                  src={nft.metadata?.image || "https://lh3.googleusercontent.com/rkb24kmM_4EQm6OZ8FR-pm-AUoMystofkv47eGmxXpSc4xwQOoqZoQqNWEPqm7eyBLSJ3zqFPHjkUvvpgxiuQj0pge-19OLa0zMDcw=w600"}
                  alt="NFT Image Preview"
                  title={nft.metadata?.name || "Unnamed NFT"}
                  description={nft.metadata?.description || "No description available"}
                  price={nft.price}
                  isListed={false}
                  tokenId={nft.tokenId}
                  marketId={nft.marketId}
                  creator={nft.owner}
                  onClick={() => clickOnNft(nft.contractAddress, nft.tokenId)}
                />
                ))}
              </div>
            </div>
          ) : (
            <p>No Listed NFTs found</p>
          )}
        </>
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setLoading(true);
          router.push(`explore/?page=${page}`);
        }}
        nftsPerPage={100}
      />
    </>
  );
};

export default Explore;
