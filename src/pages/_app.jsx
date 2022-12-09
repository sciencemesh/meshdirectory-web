import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Header, { titleDefault } from '@/config'
import Layout from '@/components/dom/Layout'
import Error from '@/pages/_error'
import { useRouter } from 'next/router'
import '@/styles/index.css'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true, suspense: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  const { query, isReady } = useRouter()
  const { providerDomain, token } = query

  const [withProvider, setWithProvider] = useState(null)
  const [fromProvider, setFromProvider] = useState(null)
  const propsReady = isReady && pageProps.providers
  const propsValid = propsReady && fromProvider && token

  useEffect(() => {
    if (propsReady) {
      const from = pageProps.providers.find((p) => p.domain.toLowerCase() === providerDomain?.toLowerCase())
      setFromProvider(from || false)
    }
  }, [propsReady, setFromProvider, providerDomain, pageProps.providers])

  return (
    <>
      <Header title={`${titleDefault} | ${pageProps.title}`} />
      <Layout ref={ref}>
        {propsReady && fromProvider === false && (
          <Error
            status={400}
            message='Invite link is broken'
            details='Originating ScienceMesh site could not be found'
          />
        )}
        {propsReady && !token && (
          <Error status={400} message='Invite link is broken' details='Token missing or invalid' />
        )}
        {propsValid && (
          <Component
            {...pageProps}
            setWithProvider={setWithProvider}
            withProvider={withProvider}
            fromProvider={fromProvider}
            setFromProvider={setFromProvider}
          />
        )}
        {propsValid && Component?.canvas && (
          <Scene className='hidden sm:block !absolute !top-0 !left-0 !pointer-events-none !overflow-visible !h-[100vh] !w-screen'>
            {Component.canvas({ ...pageProps, fromProvider, withProvider })}
          </Scene>
        )}
      </Layout>
    </>
  )
}
