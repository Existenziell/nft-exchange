import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import { connectToDatabase } from "../../lib/mongodb"
import convertSlug from '../../lib/convertSlug'

import {
  nftaddress, nftmarketaddress
} from '../../config'

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'

const Asset = ({ asset }) => {
  const [nft, setNft] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadNFT()
  }, [])

  async function loadNFT() {
    const web3Modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)

    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(data.map(async i => {

      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))

    const selectedItem = await items.filter(i => { return i.tokenId === asset.assetId })[0]
    setNft(selectedItem)
    setLoadingState('loaded')
  }

  async function buyNft(nft) {
    const web3Modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFT()
  }

  if (loadingState === 'not-loaded')
    return (<div className='ml-4'>Loading...</div>)

  return (
    <div className="px-4 pb-16 flex justify-center">

      <div className="border border-brand rounded overflow-hidden text-left max-w-lg">
        <img src={nft.image} alt={nft.image} className='' />
        <div className="p-4">
          <p className="text-2xl font-semibold h-16">{nft.name}</p>
          <p className="my-6">{nft.description}</p>
        </div>

        <div className="p-4 bg-brand">
          <p className="text-2xl mb-4 font-bold text-brand-dark">{nft.price} ETH</p>
          <button className="w-full bg-brand-dark text-brand font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(ctx) {
  const { db } = await connectToDatabase()

  const assets = await db
    .collection("assets")
    .find()
    .toArray()

  const slug = ctx.params.slug
  let asset = assets.filter((a) => (convertSlug(a.name) === slug))[0]
  asset = JSON.parse(JSON.stringify(asset))

  return {
    props: { asset }
  }
}

export async function getStaticPaths() {
  const { db } = await connectToDatabase()

  const assets = await db
    .collection("assets")
    .find()
    .toArray()

  const paths = assets.map(asset => {
    return ({
      params: { slug: convertSlug(asset.name) },
    })
  })
  return { paths, fallback: false }
}

export default Asset
