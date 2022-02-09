import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Layout from '../components/_Layout'
import Head from 'next/head'
import AppContext from "../context/AppContext"
import { useState } from 'react'

function Exchange({ Component, pageProps }) {

  const [isCorrectChain, setIsCorrectChain] = useState(false)
  const [userChainId, setUserChainId] = useState(0)
  const [provider, setProvider] = useState()

  return (
    <AppContext.Provider value={{
      state: {
        userChainId: userChainId,
        isCorrectChain: isCorrectChain,
        provider: provider,
      },
      setIsCorrectChain: setIsCorrectChain,
      setUserChainId: setUserChainId,
      setProvider: setProvider,
    }}
    >
      <Head>
        <title>NFT Exchange | Create, List and Trade NFTs</title>
        <meta name='description' content='NFT Exchange | Create, List and Trade NFTs' />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#a6d1c9" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#a6d1c9" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#a6d1c9" />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="true" />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider >
  )
}

export default Exchange
