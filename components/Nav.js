import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = () => {

  const router = useRouter()
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Sell Digital Asset', path: '/create-item' },
    { name: 'My Digital Assets', path: '/my-assets' },
    { name: 'Creator Dashboard', path: '/creator-dashboard' },
  ]

  return (
    <nav className="border-b p-6">
      <p className="text-4xl font-bold">NFT Engine Exchange</p>
      <div className="flex mt-4">

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
