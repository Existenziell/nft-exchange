import Image from 'next/image'

const About = () => {
  return (
    <div className='text-lg text-center flex flex-col items-center justify-center'>
      <h1 className='text-4xl mb-8'>NFT Exchange Platform</h1>

      <div className='flex flex-col items-center justify-center gap-4 lg:flex-row'>
        <p className='mx-auto lg:w-1/2 lg:text-right mb-8'>
          We strongly believe in the utility of Non Fungible Tokens for many upcoming applications,
          way beyond what is realized at the moment in this space. The possibilities for areas such as Ticketing, Asset Tokens (Games, Metaverse), Collectibles, etc. are incredible.
        </p>
        <Image src='/nft-ex.png' width={400} height={415} alt='NFT Exchange' />
      </div>
      <p className='mt-8 mb-1'>Let us help you leverage the possibilities of NFTs:</p>
      <ul className=' list-disc text-left'>
        <li>Certainty of uniqueness</li>
        <li>Programmable and provable Scarcity</li>
        <li>Tradable Ownership on-chain</li>
        <li>Asset Tokenization</li>
      </ul>

    </div>
  )
}

export default About
