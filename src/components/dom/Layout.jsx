import { useRef, forwardRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import Navbar from '@/components/dom/Navbar'
import Footer from '@/components/dom/Footer'

const Layout = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef()

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div ref={mergeRefs([ref, localRef])} className='justify-center w-screen dom text-gray-50'>
        {children}
      </div>
      <Footer />
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
