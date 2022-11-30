import { useRef, useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header, { titleDefault } from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.css'
import { Loader, useProgress } from '@react-three/drei'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true, suspense: true })

// const GlobeLoader = () => {
//   useEffect(() => {
//     console.log('globe fallback mounted')

//     return () => {
//       console.log('globe fallback unmounted')
//     }
//   }, [])

//   return (
//     <div>
//       <h1 className='text-4xl font-medium'>Globe is loading</h1>
//     </div>
//   )
// }

function SuspenseLoader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Loader />
}

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
          <>
            <Suspense fallback={<SuspenseLoader />}>
              <Scene
                className='overflow-visible pointer-events-none !min-w-[80vw] !h-[100vh]'
                // eventSource={ref}
                eventPrefix='client'>
                {Component.canvas({ ...pageProps, fromProvider, withProvider })}
              </Scene>
            </Suspense>
            <Loader />
          </>
        )}
      </Layout>
    </>
  )
}
