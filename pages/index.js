import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal" // Used to connect to a users ehtereum wallet
import Link from 'next/link'

// Will be populated once the smart contracts are deployed.
import {
  nftaddress, nftmarketaddress
} from '../config'

// Import ABIs - JSON representation of our smart contracts - allows to interaction from a frontend application
// Have been compiled by hardhat
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    // local
    // const provider = new ethers.providers.JsonRpcProvider()
    // mainnet/testnet
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
    setNfts(items)
    setLoadingState('loaded')
  }

  async function buyNft(nft) {
    // Check MetaMask
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
    loadNFTs()
  }

  if (loadingState === 'not-loaded')
    return (<div className='ml-4'>Loading...</div>)

  if (loadingState === 'loaded' && !nfts.length)
    return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)

  return (
    <div className="px-4 pb-16">
      <h1 className='text-brand text-2xl mb-8'>Special Collection Today:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16 pt-4">
        {nfts.map((nft, i) => (

          <div key={i} className="border border-brand shadow rounded overflow-hidden text-left">
            <Link href={`/assets/${nft.name.replaceAll(' ', '-').toLowerCase()}`}>
              <a>
                <img src={nft.image} alt={nft.image} className='' />
                <div className="p-4">
                  <p className="text-2xl font-semibold h-16">{nft.name}</p>
                  <p className="my-6">{nft.description}</p>
                  <div className='text-sm'>
                    <p>Owner: <span>{nft.owner.substring(0, 5)}&#8230;{nft.owner.slice(nft.owner.length - 4)}</span></p>
                    <p>Seller: <span>{nft.seller.substring(0, 5)}&#8230;{nft.seller.slice(nft.seller.length - 4)}</span></p>
                    {nft.tokenId}
                  </div>

                </div>
              </a>
            </Link>
            <div className="p-4 bg-brand">
              <p className="text-2xl mb-4 font-bold text-brand-dark">{nft.price} ETH</p>
              <button className="w-full bg-brand-dark text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}
