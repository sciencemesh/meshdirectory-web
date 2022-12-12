import { useRef, forwardRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import Navbar from '@/components/dom/Navbar'
import Footer from '@/components/dom/Footer'

const Layout = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef()

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main
        ref={mergeRefs([ref, localRef])}
        className='flex flex-row justify-center w-screen min-h-screen mx-auto sm:justify-between max-w-7xl dom text-gray-50'>
        <div className='relative'>{children}</div>
      </main>
      <Footer />
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
