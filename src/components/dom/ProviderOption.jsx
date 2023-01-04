import { HiOutlineStar, HiStar } from 'react-icons/hi'
import { Combobox } from '@headlessui/react'
import { BiInfoSquare } from 'react-icons/bi'

const ProviderInfoIcon = (props) => <BiInfoSquare {...props} />

export default function ProviderOption({ provider, preferred, togglePreferred, openDetails }) {
  return (
    <Combobox.Option
      value={provider}
      className={({ active }) =>
        `flex items-center no-wrap cursor-default select-none p-4 ${
          active ? 'bg-primary-dark text-white' : 'text-gray-900'
        }`
      }>
      {({ selected, active }) => (
        <>
          <button
            aria-hidden='true'
            tabIndex='-1'
            onClick={(e) => togglePreferred(e, provider)}
            className={`flex items-center pr-3 z-20 ${preferred ? 'text-yellow-500' : 'text-gray-100'}`}>
            {preferred ? (
              <HiStar className='w-5 h-5' aria-hidden='true' />
            ) : (
              <HiOutlineStar className='w-5 h-5' aria-hidden='true' />
            )}
          </button>
          <span className={`grow truncate ${selected ? 'font-semibold text-lg' : 'font-normal'}`}>
            {provider.fullName || provider.name}
          </span>
          <ProviderInfoIcon
            onClick={(e) => openDetails(e, provider)}
            className='w-5 h-5 cursor-pointer text-secondary-dark'
          />
        </>
      )}
    </Combobox.Option>
  )
}
