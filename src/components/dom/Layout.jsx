import { useRef, forwardRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import Navbar from '@/components/dom/Navbar'
import Footer from '@/components/dom/Footer'

const Layout = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef()

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div
        ref={mergeRefs([ref, localRef])}
        className='flex flex-row justify-between w-screen min-h-screen mx-auto max-w-7xl dom text-gray-50'>
        {children}
      </div>
      <Footer />
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
