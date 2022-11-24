import * as React from 'react'
import { mergeRefs } from 'react-merge-refs'
import Navbar from '@/components/dom/Navbar'
import Footer from '@/components/dom/Footer'

const Layout = React.forwardRef(({ children, ...props }, ref) => {
  const localRef = React.useRef()
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div
        ref={mergeRefs([ref, localRef])}
        className='z-10 flex flex-col justify-center w-full px-2 mx-auto grow dom text-gray-50 max-w-7xl sm:px-6 lg:px-8 py-50'>
        {children}
      </div>
      <Footer />
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
