import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Nav = () => {

  const router = useRouter()
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Sell Asset', path: '/create-asset' },
    { name: 'My Assets', path: '/my-assets' },
    { name: 'Dashboard', path: '/dashboard' },
  ]

  return (
    <nav className="border-b border-brand p-6 flex items-center justify-between bg-brand-dark text-brand">

      <div className='flex items-center'>
        <Image src='/nft.png' width={100} height={106} alt='nft' />
        <p className="ml-8 text-4xl font-bold text-center">NFT Exchange</p>
      </div>

      <div>
        {links.map(l => {
          return (
            <Link href={l.path} key={l.name}>
              <a className={`mr-4 text-brand ${router.pathname == l.path ? "active" : ""}`}>
                {l.name}
              </a>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Nav
