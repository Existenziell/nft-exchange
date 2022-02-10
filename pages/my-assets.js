import { ethers } from 'ethers'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import AppContext from '../context/AppContext'
import Link from 'next/link'

// Will be populated once the smart contracts are deployed.
import {
  nftaddress, nftmarketaddress
} from '../config'

import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function MyAssets() {

  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  const context = useContext(AppContext)
  let isCorrectChain = context.state.isCorrectChain
  let provider = context.state.provider

  useEffect(() => {
    if (isCorrectChain && provider) loadNFTs()
  }, [isCorrectChain, loadingState])

  async function loadNFTs() {
    const signer = provider.getSigner()
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()

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
        image: meta.data.image,
      }
      return item
    }))
    console.log(items);
    setNfts(items)
    setLoadingState('loaded')
  }

  if (loadingState === 'loaded' && !nfts.length)
    return (
      <>
        <h1 className="text-2xl">No assets owned yet.</h1>
        <Link href='/'><a className='link'>Browse catalogue</a></Link>
      </>
    )

  return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border border-brand text-brand-dark shadow rounded overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-brand">
                  <p className="text-2xl font-semibold mb-4">{nft.name}</p>
                  <p className="font-bold">Price - {nft.price} Eth</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
