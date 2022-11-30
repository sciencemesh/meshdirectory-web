import logoDarkBg from '#/img/logo-dark-bg.svg'
import NavLink from '@/components/dom/NavLink'
import Image from 'next/legacy/image'

const RESOURCES_LINKS = [
  { name: 'Documentation', href: 'https://sciencemesh.io' },
  { name: 'Deploy', href: 'https://developer.sciencemesh.io/docs/iop/deployment/' },
  { name: 'Contact', href: 'https://cs3mesh4eosc.eu/contact' },
]

export default function Footer() {
  return (
    <footer className='p-4 border-t-4 shadow-inner border-primary bg-secondary sm:p-6'>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 py-50'>
        <div className='md:flex md:justify-between'>
          <div className='mb-6 md:mb-0'>
            <NavLink href='https://cs3mesh4eosc.eu/' current className='flex items-center'>
              <Image
                className='block w-auto pr-2 h-36'
                src={logoDarkBg}
                layout='fixed'
                height={160}
                width={300}
                priority={false}
                alt='ScienceMesh CS3MESH4EOSC Logo'
              />
            </NavLink>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-white uppercase'>Resources</h2>
              <ul className='text-gray-200'>
                {RESOURCES_LINKS.map(({ name, href }) => (
                  <li key={name} className='mb-4'>
                    <a href={href} className='hover:underline'>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className='my-6 border-secondary-light sm:mx-auto lg:my-8' />
        <div className='flex items-center justify-center'>
          <span className='text-sm font-light text-center text-gray-100'>
            <p>
              <a href='https://cs3mesh4eosc.eu/' target='_new'>
                CS3MESH4EOSC
              </a>{' '}
              has received funding from the European Union&apos;s Horizon 2020 research and innovation programme under
              the Grant Agreement no 863353
            </p>
          </span>
        </div>
      </div>
    </footer>
  )
}
