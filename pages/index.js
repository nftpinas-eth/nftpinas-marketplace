//import type { NextPage } from 'next'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Footer from '../components/Footer'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'

const Home = () => {
  return (
    <>
    <Hero />
    <About />
    </>
  )
}

export default Home
