import { HiOutlineInformationCircle } from 'react-icons/hi'


export default function ErrorBanner ({ error }) {
    const { message } = error
    return <div className="flex items-center bg-red-700 bg-opacity-75 mt-2 text-white text-sm font-bold px-4 py-3" role="alert">
        <HiOutlineInformationCircle className='w-5 h-5 mr-2' />
        <p>{message}</p>
    </div>
}
