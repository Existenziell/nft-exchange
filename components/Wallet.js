
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { hasEthereum } from '../lib/ethereum'
import { ConnectWallet } from './ConnectWallet'
import { chains } from '../lib/chains'
import AppContext from '../context/AppContext'

const Wallet = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [connectedWalletAddress, setConnectedWalletAddress] = useState('')
  const router = useRouter()

  const context = useContext(AppContext)
  let isCorrectChain = context.state.isCorrectChain

  const getNameFromChainId = (chainId) => {
    if (chainId === 1337) return 'Local (1337)'
    const network = chains.filter(c => (c.chainId === chainId))
    return network[0].name
  }

  useEffect(() => {
    async function setAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const userNetwork = await provider.getNetwork()
      const userChainId = userNetwork.chainId
      context.setUserChainId(userChainId)
      context.setProvider(provider)

      // Is user on Polygon Mumbai?
      userChainId === 80001 ?
        // setIsCorrectChain(true)
        context.setIsCorrectChain(true)
        :
        // setIsCorrectChain(false)
        context.setIsCorrectChain(false)

      const signer = provider.getSigner()
      try {
        const signerAddress = await signer.getAddress()
        setConnectedWalletAddress(signerAddress)
        setIsWalletConnected(true)
      } catch {
        setIsWalletConnected(false)
        setConnectedWalletAddress('')
      }
    }

    if (hasEthereum()) setAddress()

    window.ethereum?.on('connect', (accounts) => {
      // console.log('Connected:', accounts, getNameFromChainId(parseInt(accounts.chainId, 16)))
    })

    window.ethereum?.on('accountsChanged', (accounts) => {
      // console.log('accountsChanged', accounts)
      router.reload(window.location.pathname)
    })

    window.ethereum?.on('chainChanged', (chainId) => {
      const userChainId = parseInt(chainId, 16)
      // console.log('Chain changed:', getNameFromChainId(userChainId))
      context.setUserChainId(userChainId)
      // Is user on Polygon Mumbai?
      userChainId === 80001 ?
        // setIsCorrectChain(true)
        context.setIsCorrectChain(true)
        :
        // setIsCorrectChain(false)
        context.setIsCorrectChain(false)
    })
  }, [router, isCorrectChain, context.setIsCorrectChain])

  return (
    <div className='absolute top-24 right-6 text-right text-sm'>
      {isWalletConnected ?
        <div className='dark:text-brand'>
          {connectedWalletAddress.substring(0, 5)}&#8230;{connectedWalletAddress.slice(connectedWalletAddress.length - 4)}
        </div>
        :
        <ConnectWallet />
      }
    </div>
  )
}

export default Wallet
