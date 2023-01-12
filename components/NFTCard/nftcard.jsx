import React from 'react'
import Image from 'next/image'

const style = {
    nftContainer: `overflow-hidden border shadow rounded-xl`,
    title: `font-mono font-black text-4xl text-slate-900 `,
    subTitle: `font-mono font-black text-lg text-slate-900`,
    description: `font-mono font-semibold text-sm text-slate-700`
  }

  const NftCard = ({ image, name, description, price, onClick }) => {
    return (
      <div onClick={onClick} className="nft-card">
            <div  className={style.nftContainer}>
                <Image
                    src={image}
                    alt="NFT Image Here"
                    width={500}
                    height={500}
                />
                <div className="px-4">
                    <p style={{ height: '32px'}} className={style.subTitle}>
                    {name}
                    </p>
                    <div style={{ height: '50px', overflow: 'hidden'}}>
                    <p className={style.description}>{description}</p>
                    </div>
                    <div style={{ height: '50px', overflow: 'hidden'}}>
                    <p className={style.subTitle}>{price} ETH</p>
                    </div>
                </div>
            </div>
      </div>
    );
  };
  
  export default NftCard;