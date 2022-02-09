import NextNprogress from 'nextjs-progressbar'
import Image from 'next/image'
import Nav from './Nav'
import SVGs from './SVGs'

const Layout = ({ children }) => {
  return (
    <>
      <NextNprogress startPosition={0.3} stopDelayMs={100} height={3} showOnShallow={true} color='var(--color-brand)' />


      <div className='flex items-center justify-between bg-brand-dark text-brand pb-12'>

        <div className='w-full max-w-xs ml-4 mt-4' style={{ maxWidth: '220px' }}>
          <SVGs />
        </div>
        {/* <p className="hidden lg:block ml-8 text-4xl font-bold text-center">NFT Exchange</p> */}

        <Nav />

      </div>



      <main className='w-full min-h-screen py-8 px-4 md:px-8 text-center text-brand bg-brand-dark bg-cover'>
        {children}
      </main>
    </>
  )
}

export default Layout
