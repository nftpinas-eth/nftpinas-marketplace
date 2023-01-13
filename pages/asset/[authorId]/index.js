import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
//import { data } from 'autoprefixer'
import Image from 'next/image'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

const fetchData = async (id) => {
    const { data } = await axios.get(`https://api.nftpinas.io/v1/nfts/${id}`)
    return data
}

const style = {
    mainContainer: `flex h-[20vh] w-screen overflow-hidden justify-center items-center`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-screen px-4`,
    midRow: `w-full flex justify-center text-white`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-5rem]`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    socialIconsContainer: `flex text-3xl mb-[-2rem]`,
    socialIconsWrapper: `w-44`,
    socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
    socialIcon: `my-2`
}

const AuthorId = () => {
    const router = useRouter()
    const { authorId } = router.query

    const nftId = typeof router.query?.authorId === "string" ? router.query.authorId : "";

    const { data, isLoading, isFetching } = useQuery(["getNft", nftId], () => fetchData(nftId), {
        enabled: true
    })

    if (isLoading) {
        return <div className="center">Loading...</div>;
    }

    if (!data) return <div>No Data Found</div>
   
    return (
        <>

        </>
    )
}

export default AuthorId