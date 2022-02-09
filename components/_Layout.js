import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { hasEthereum } from '../lib/ethereum'
import { ConnectWallet } from './ConnectWallet'
import { chains } from '../lib/chains'
import NextNprogress from 'nextjs-progressbar'
import Image from 'next/image'
import Link from 'next/link'
import Nav from './Nav'
import SVGs from './SVGs'
import Wallet from './Wallet'

const Layout = ({ children }) => {
  return (
    <>
      <NextNprogress startPosition={0.3} stopDelayMs={100} height={3} showOnShallow={true} color='var(--color-brand)' />
      <div className='flex items-center justify-between bg-brand-dark text-brand pb-12'>
        <div className='w-full max-w-xs ml-4 mt-4' style={{ maxWidth: '220px' }}>
          <Link href='/'><a>
            <SVGs />
          </a></Link>
        </div>
        <Nav />
        <Wallet />
      </div>
      <main className='w-full min-h-screen py-8 px-4 md:px-8 text-center text-brand bg-brand-dark bg-cover'>
        {children}
      </main>
    </>
  )
}

export default Layout
