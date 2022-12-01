import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiRefresh } from 'react-icons/hi'

const statusCodes = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}

function Error({ status, message, details }) {
  const [retryUrl, setRetryUrl] = useState('/')

  useEffect(() => {
    setRetryUrl(window.location.href)
  }, [])

  return (
    <div className='min-h-full px-4 py-16 bg-white sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
      <div className='mx-auto max-w-max'>
        <main className='sm:flex'>
          <p className='text-4xl font-bold tracking-tight text-transparent bg-gradient-to-br from-red-500 to-secondary-dark bg-clip-text sm:text-5xl'>
            {status}
          </p>
          <div className='sm:ml-6'>
            <div className='sm:border-secondary sm:border-l sm:pl-6'>
              <h1 className='text-4xl font-bold tracking-tight text-secondary-dark sm:text-5xl'>
                {message ?? statusCodes[status] ?? 'Oops! Something went wrong'}
              </h1>
              <p className='mt-1 text-base text-secondary-dark'>{details}</p>
            </div>

            <div className='flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
              <Link
                href={retryUrl}
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-white border-transparent rounded-md bg-gradient-to-br from-primary to-secondary-dark shadow-sm hover:bg-gradient-to-br hover:from-red-600 hover:to-yellow-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
                <HiRefresh />
                Try again
              </Link>
              <Link
                className='inline-flex items-center px-4 text-sm border rounded-md border-secondary text-secondary hover:bg-secondary-dark hover:text-white'
                href='https://cs3mesh4eosc.eu/contact'>
                Contact support
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ error }) => {
  return { ...error }
}

export default Error
