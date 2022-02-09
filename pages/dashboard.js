import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'

import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function CreatorDashboard() {

  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const ipfsUrl = 'https://ipfs.infura.io/ipfs/'

  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)

      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        name: meta.data.name,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
        ipfsImageId: (meta.data.image).replaceAll(ipfsUrl, ""),
        ipfsTokenId: (meta.config.url).replaceAll(ipfsUrl, ""),
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded')
  }

  if (loadingState === 'loaded' && !nfts.length)
    return (
      <>
        <h1 className="text-2xl">No assets created yet.</h1>
        <Link href='/create-asset'><a className='link'>Create asset</a></Link>
      </>
    )

  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2 text-left">Items Created:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded overflow-hidden">
              <div className='bg-white h-128 object-cover'>
                <img src={nft.image} className='h-128 object-cover' />
              </div>
              <div className="p-4 bg-brand text-brand-dark">
                <p className="text-2xl font-semibold mb-2 h-16">{nft.name}</p>
                {/* <p className='text-xs'>Token ID: {nft.ipfsTokenId}</p>
                  <p className='text-xs'>Image ID: {nft.ipfsImageId}</p> */}
                <p className="font-bold mt-4">Price - {nft.price} Eth</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4">
        <h2 className="text-2xl py-2 text-left mt-8">Items sold:</h2>
        {Boolean(sold.length) ?
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {
                sold.map((nft, i) => (
                  <div key={i} className="border shadow rounded overflow-hidden">
                    <img src={nft.image} className="rounded" />
                    <div className="p-4 bg-brand text-brand-dark">
                      <p className="text-2xl font-semibold mb-2">{nft.name}</p>
                      <p className="font-bold">Price - {nft.price} Eth</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          :
          <p className='text-left'>No items sold yet.</p>
        }
      </div>
    </div>
  )
}
