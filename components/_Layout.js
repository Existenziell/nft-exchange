import NextNprogress from 'nextjs-progressbar'
import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <>
      <NextNprogress startPosition={0.3} stopDelayMs={100} height={3} showOnShallow={true} color='var(--color-brand)' />
      <Nav />

      <main className='w-full min-h-screen py-8 px-4 md:px-8 text-center text-brand bg-brand-dark bg-cover'>
        {children}
      </main>
    </>
  )
}

export default Layout
