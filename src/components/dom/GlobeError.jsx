import { HiOutlineInformationCircle } from 'react-icons/hi'

export default function GlobeError({ error }) {
  const { message } = error
  return (
    <div
      className='items-center px-4 py-3 mt-2 text-sm font-bold text-white bg-red-700 !bottom-0 !right-0 !fixed bg-opacity-75'
      role='alert'>
      <p>
        <HiOutlineInformationCircle className='w-5 h-5 mr-2' />
        We are facing some issues displaying the Mesh globe 🌐.
      </p>
    </div>
  )
}
