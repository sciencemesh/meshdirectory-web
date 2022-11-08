import * as React from 'react'
import { classNames } from '../src/util'

export default function NavLink ({
  name,
  href,
  current,
  variant = 'default',
  as = 'a',
  children,
  ...rest
}) {
  const AsComponent = as
  const className =
    variant === 'default'
      ? 'bg-white border border-gray text-current hover:bg-gray hover:text-white'
      : variant === 'dark'
        ? 'bg-gray-dark text-white  border-gray-dark hover:bg-blue hover:border-blue'
        : 'bg-blue text-white focus:ring-blue'

  return (
    <AsComponent
      key={name}
      href={href}
      className={classNames(
        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 px-3 py-2 sm:opacity-95 hover:opacity-100 transition-opacity ease-in-out duration-150 rounded-md text-sm font-normal',
        className,
      )}
      aria-current={current ? 'page' : undefined}
      {...rest}
    >
      {name && name}
      {children && children}
    </AsComponent>
  )
}
