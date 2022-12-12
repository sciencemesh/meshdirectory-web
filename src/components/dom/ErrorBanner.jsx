import { HiOutlineInformationCircle } from 'react-icons/hi'

export default function ErrorBanner({ error }) {
  const { message } = error
  return (
    <div
      className='flex items-center px-4 py-3 mt-2 text-sm font-bold text-white bg-red-700 bg-opacity-75'
      role='alert'>
      <HiOutlineInformationCircle className='w-5 h-5 mr-2' />
      <p>{message}</p>
    </div>
  )
}
