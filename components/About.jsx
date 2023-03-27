import React from "react";

const About = () => {
  return (
    <div className="flex w-full items-center justify-center h-[600px] min-w-[360px] bg-[#1F1D1B] md:px-[20%]">
      <div className="flex flex-col justify-center items-center mx-[5.5rem] mt-20">
        <div className="relative text-[#FFFF] text-[36px] font-mono">About Us</div>
        <div className="text-[#FFFF] font-mono text-1xl mt-[0.8rem] mb-[2.5rem] md:w-[500px]">
          <h1>
            NFTPinas is an NFT marketplace place built on zkSync focused on
            bootstrapping Filipino NFT/Metaverse artists/projects. Soon to
            expand in SEA + globally.
          </h1>
          <h2>
            <br />
            Our mission is to help artists/projects jumpstart in the NFT
            ecosystem also become a platform that will support public good
            funding.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default About;
