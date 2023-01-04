import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { AiOutlineCloudServer } from 'react-icons/ai'
import { SiNextcloud } from 'react-icons/si'
import { BiCloud } from 'react-icons/bi'

const NextcloudIcon = (props) => <SiNextcloud {...props} />
const OwnCloudIcon = (props) => <BiCloud {...props} />
const GenericCloudIcon = (props) => <AiOutlineCloudServer {...props} />

export default function ProviderModal({ provider, close }) {
  const { properties, homepage, description, fullName, organization, efss } = provider || {}
  const operator = properties?.ORGANIZATION || properties?.OPERATOR || organization || 'unknown'
  const efssProduct = efss?.product || efss?.productname
  const EFSSIcon = efssProduct
    ? efssProduct.toLowerCase() === 'nextcloud'
      ? NextcloudIcon
      : efssProduct.toLowerCase() === 'owncloud'
      ? OwnCloudIcon
      : GenericCloudIcon
    : null

  return (
    <>
      {provider && (
        <Transition appear show={provider ? true : false} as={Fragment}>
          <Dialog as='div' static className='relative z-50' onClose={(e) => close(e)}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex items-center justify-center min-w-full min-h-full p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'>
                  <Dialog.Panel className='w-full max-w-md p-6 overflow-hidden text-left align-middle bg-white shadow-xl transform rounded-2xl transition-all'>
                    <Dialog.Title as='h3' className='text-xl font-medium text-gray-900 border-b-2 leading-6'>
                      <span className='mr-2 font-bold'>{fullName}</span>
                      <span className='font-light text-gray-500'> site info</span>
                    </Dialog.Title>
                    <div className='mt-2 text-sm text-gray-500 space-y-4'>
                      <p className='text-lg'>{description}</p>
                      {homepage && (
                        <div>
                          <h4 className='font-bold text-gray-900 uppercase leading-4'>Website</h4>
                          <a href={homepage} className='block my-1 hover:underline' target='_new'>
                            {homepage}
                          </a>
                        </div>
                      )}
                      <div>
                        <h4 className='font-bold text-gray-900 uppercase leading-4'>
                          <abbr title='Enterprise file synchronization and sharing'>EFSS</abbr> product
                        </h4>
                        <p className='my-1 capitalize'>
                          {EFSSIcon && (
                            <EFSSIcon className='self-center inline-block w-5 h-5 mr-1' aria-hidden='true' />
                          )}
                          {efssProduct || 'unknown'} {efssProduct && efss.versionstring}
                        </p>
                      </div>
                      <div>
                        <h4 className='font-bold text-gray-900 uppercase leading-4'>Operated By</h4>
                        <p className='my-1'>{operator}</p>
                      </div>
                    </div>

                    <div className='mt-4'>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={(e) => close(e)}>
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  )
}
