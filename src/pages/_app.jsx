import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Header, { titleDefault } from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.css'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true, suspense: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  const [withProvider, setWithProvider] = useState(null)
  const [fromProvider, setFromProvider] = useState(null)

  return (
    <>
      <Header title={`${titleDefault} | ${pageProps.title}`} />
      <Layout ref={ref}>
        <Component
          {...pageProps}
          setWithProvider={setWithProvider}
          withProvider={withProvider}
          fromProvider={fromProvider}
          setFromProvider={setFromProvider}
        />
        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
         * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
        {Component?.canvas && fromProvider && (
          <Scene className='hidden sm:block !absolute !top-0 !left-0 !pointer-events-none !overflow-visible !h-[100vh] !w-screen'>
            {Component.canvas({ ...pageProps, fromProvider, withProvider })}
          </Scene>
        )}
      </Layout>
    </>
  )
}
