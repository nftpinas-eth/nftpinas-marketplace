/** @type {import('next').NextConfig} */
require("dotenv").config()

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['nftpinas.infura-ipfs.io', 'mintsquare.sfo3.cdn.digitaloceanspaces.com', 'lh3.googleusercontent.com', "ipfs.io"]
  },
  env: {
    PROJECTID: process.env.PROJECTID,
    PROJECTSECRET: process.env.PROJECTSECRET,
    API_URL: process.env.API_URL
  }
}
