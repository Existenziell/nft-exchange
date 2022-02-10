import { ethers } from 'ethers'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'
import Image from 'next/image'
import AppContext from '../context/AppContext'
import convertSlug from '../lib/convertSlug'

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

const Exchange = () => {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  const context = useContext(AppContext)
  let isCorrectChain = context.state.isCorrectChain
  let provider = context.state.provider

  useEffect(() => {
    if (isCorrectChain && provider) loadNFTs()
  }, [isCorrectChain, loadingState])

  async function loadNFTs() {
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

  if (!context.state.isCorrectChain)
    return (
      <>
        <p className='text-lg'>We operate on the Polygon Mumbai Testnet (80001).<br />Please change your network to proceed.</p>
        <p className='mt-2 text-sm'><a href='https://blog.pods.finance/guide-connecting-mumbai-testnet-to-your-metamask-87978071aca8' target='_blank' className='link'>This</a> article can help with that.</p>
      </>
    )

  if (loadingState === 'not-loaded')
    return (<div className='ml-4'>Loading...</div>)

  if (loadingState === 'loaded' && !nfts.length)
    return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)

  return (
    <div className="px-4 pb-16">
      <section className='bla bg-ribbon bg-no-repeat bg-center flex justify-center'>
        <div className='bg-white rounded-full border-2 border-gray-400 w-40 h-40 flex items-center'>
          <img src='/clients/scarselli.png' />
        </div>
      </section>
      <h2 className='text-3xl mt-8'>Scarselli Diamonds</h2>

      <div className='border border-gray-300 text-gray-500 w-full lg:w-1/2 mx-auto rounded-2xl mb-8 mt-2'>
        <ul className='flex items-center justify-between py-4'>
          <li className='border-r w-1/4'><span className='font-extrabold text-lg block text-brand'>10K</span>items</li>
          <li className='border-r w-1/4'><span className='font-extrabold text-lg block text-brand'>69</span>owners</li>
          <li className='border-r w-1/4'><span className='font-extrabold text-lg block text-brand'>1.25</span>floor price</li>
          <li className='w-1/4'><span className='font-extrabold text-lg block text-brand'>42.8K</span>volume traded</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pt-4">
        {nfts.map((nft, i) => (
          <div key={i} className="border border-gray-400 shadow hover:shadow-lg rounded overflow-hidden text-left mb-16 transition-all">
            <Link href={`/assets/${convertSlug(nft.name)}`}>
              <a>
                <Image width={600} height={600} layout={'responsive'} src={nft.image} alt={nft.image} />
                <div className="p-4">
                  <p className="text-xl sm:text-2xl font-semibold h-16">{nft.name}</p>
                  <p className="my-6">{nft.description}</p>
                  <div className='text-sm'>
                    <p>Owner: <span>{nft.owner.substring(0, 5)}&#8230;{nft.owner.slice(nft.owner.length - 4)}</span></p>
                    <p>Seller: <span>{nft.seller.substring(0, 5)}&#8230;{nft.seller.slice(nft.seller.length - 4)}</span></p>
                  </div>
                </div>
              </a>
            </Link>
            <div className="p-4 bg-brand">
              <p className="text-2xl mb-4 font-bold text-brand-dark">{nft.price} ETH</p>
              <button className="w-full bg-brand-dark text-brand font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default Exchange
