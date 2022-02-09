import Image from 'next/image'

const About = () => {
  return (
    <div className='text-lg text-center flex flex-col items-center justify-center pb-16'>
      <h1 className='text-4xl mb-12'>NFT Exchange Platform</h1>

      <div className='flex flex-col items-center justify-center gap-4 md:flex-row w-full'>
        <p className='mx-auto md:w-1/2 md:text-right mb-8'>
          We strongly believe in the utility of Non Fungible Tokens for many upcoming applications,
          way beyond what is realized at the moment in this space. The possibilities for areas such as Ticketing, Asset Tokens (Games, Metaverse), Collectibles, etc. are incredible.
        </p>
        <Image src='/nft-ex.png' width={300} height={310} alt='NFT Exchange' />
      </div>

      <div className='flex flex-col items-center justify-center gap-4 md:flex-row-reverse w-full'>
        <div className='mx-auto md:w-1/2 md:text-left'>
          <p className='mt-16 md:mt-0 mb-1'>Let us help you leverage the possibilities of NFTs:</p>
          <ul className='mb-16'>
            <li>Certainty of uniqueness</li>
            <li>Programmable and provable Scarcity</li>
            <li>Tradable Ownership on-chain</li>
            <li>Asset Tokenization</li>
          </ul>
        </div>
        <Image src='/nft.png' width={400} height={426} alt='NFT' />
      </div>

    </div>
  )
}

export default About
