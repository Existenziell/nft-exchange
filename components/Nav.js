import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Nav = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'Root', path: '/' },
    { name: 'Sell Asset', path: '/create-asset' },
    { name: 'My Assets', path: '/my-assets' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
  ]

  return (
    <nav>
      {/* Desktop Menu */}
      <ul className='hidden md:flex'>
        {links.map(l => {
          return (
            <li key={l.name} className='mr-4'>
              <Link href={l.path}>
                <a className={`p-3 text-brand hover:bg-brand hover:text-brand-dark transition-all ${router.pathname === l.path && 'active'}`}>
                  {l.name}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Mobile Menu */}
      {isOpen &&
        <ul className='mobile-menu left-0 right-0 top-0 bottom-0 pt-20 z-10 text-brand-dark bg-brand absolute h-screen'>
          {links.map(l => (
            <li key={l.name}>
              <Link href={l.path}>
                <a href={l.url}
                  onClick={() => setIsOpen(false)}
                  className={`${router.pathname === l.path && 'active'} 
                    w-full block text-2xl md:text-4xl text-center leading-loose px-8 py-2 md:py-8 
                    transition-all hover:bg-brand-dark hover:text-brand cursor-pointer`}>
                  {l.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      }

      {/* Mobile Hamburger Button */}
      <div className='absolute right-4 top-7 z-20'>
        <button className='mobile-menu-button outline-none' onClick={() => setIsOpen(!isOpen)} aria-label='Open Mobile Navigation'>
          {!isOpen ?
            <svg xmlns='http://www.w3.org/2000/svg' className='h-14 w-14 text-brand hover:opacity-80  block md:hidden' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' stroke='currentColor'>
              <path d='M4 6h16M4 12h16M4 18h16'></path>
            </svg>
            :
            <svg xmlns='http://www.w3.org/2000/svg' className='h-14 w-14 text-brand-dark hover:opacity-80' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          }
        </button>
      </div>

    </nav>

  )
}

export default Nav
