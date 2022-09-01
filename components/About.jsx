import React from "react";
import { BsFillShieldFill } from "react-icons/bs";

const style = {
  sectionWrapper: `flex justify-center items-center h-[600px] w-[100%] bg-zinc-100 md:px-[20%]`,
  sectionContainer: `flex flex-col justify-center items-center mx-[5.5rem] mt-20`,
  aboutInfoWrapper: "",
  aboutTitle: "relative text-black text-[36px] font-semibold",
  aboutDescription:
    "text-[#8a939b] text-1xl mt-[0.8rem] mb-[2.5rem] md:w-[500px] ",
};

const About = () => {
  return (
    <div className={style.sectionWrapper}>
      <div className={style.sectionContainer}>
        <div className={style.aboutTitle}>About Us</div>
        <div className={style.aboutDescription}>
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
