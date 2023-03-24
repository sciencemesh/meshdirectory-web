import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Header, { titleDefault } from '@/config'
import Layout from '@/components/dom/Layout'
import Error from '@/pages/_error'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouter } from 'next/router'
import '@/styles/index.css'
import GlobeError from '@/components/dom/GlobeError'
import { areEqual } from '@/util'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true, suspense: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const { query, isReady } = useRouter()
  const { providerDomain, token } = query

  const [withProvider, setWithProvider] = useState(null)
  const [fromProvider, setFromProvider] = useState(null)
  const providers = pageProps.providers?.filter(
    (p) => p.properties?.INFRASTRUCTURE === fromProvider?.properties?.INFRASTRUCTURE,
  )
  const propsReady = isReady && pageProps.providers
  const propsValid = propsReady && fromProvider && providers && token

  // Used by Mesh Globe
  const randomProviderConnections = useMemo(
    () =>
      providers
        ? providers
            .sort(() => 0.5 - Math.random())
            .map((p1, i) =>
              Math.random() > 0.5
                ? providers
                    .slice(i, Math.floor(Math.random() * 1000) % providers.length)
                    .map((p2) => (Math.random() > 0.5 ? [p1, p2] : [p1, p2]))
                : [],
            )
            .flat()
            .filter(([p1, p2]) => !areEqual(p1, p2) && p1.location && p2.location)
            .map(([p1, p2]) => {
              const { lat: startLat, lng: startLng } = p1.location
              const { lat: endLat, lng: endLng } = p2.location
              return {
                startLat,
                startLng,
                endLat,
                endLng,
                color: '#c7e8f9',
              }
            })
        : {},
    [providers],
  )

  useEffect(() => {
    if (propsReady) {
      const from = pageProps.providers.find((p) => p.domain.toLowerCase() === providerDomain?.toLowerCase())
      setFromProvider(from || false)
    }
  }, [propsReady, setFromProvider, providerDomain, pageProps.providers])

  return (
    <>
      <Header title={`${titleDefault} | ${pageProps.title}`} />
      <Layout>
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
            providers={providers}
            setWithProvider={setWithProvider}
            withProvider={withProvider}
            fromProvider={fromProvider}
            setFromProvider={setFromProvider}
          />
        )}
        {propsValid && Component?.canvas && (
          <ErrorBoundary FallbackComponent={GlobeError} onReset={() => {}}>
            <Scene className='hidden sm:block !absolute !top-0 !left-0  !overflow-visible !h-[100vh] !w-screen'>
              {Component.canvas({ ...pageProps, providers, fromProvider, withProvider, randomProviderConnections })}
            </Scene>
          </ErrorBoundary>
        )}
      </Layout>
    </>
  )
}
