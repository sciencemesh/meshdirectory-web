import * as React from 'react'
import { classNames } from '@/util'

export default function NavLink({ name, href, current, variant = 'default', as = 'a', children, ...rest }) {
  const AsComponent = as
  const className =
    variant === 'default'
      ? 'bg-white border border-secondary text-current hover:bg-secondary hover:text-white'
      : variant === 'dark'
      ? 'bg-secondary-dark text-white  border-secondary-dark hover:bg-primary hover:border-primary'
      : 'bg-primary text-white focus:ring-primary'

  return (
    <AsComponent
      key={name}
      href={href}
      className={classNames(
        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 px-3 py-2 sm:opacity-95 hover:opacity-100 transition-opacity ease-in-out duration-150 rounded-md text-sm font-normal',
        className,
      )}
      aria-current={current ? 'page' : undefined}
      {...rest}>
      {name && name}
      {children && children}
    </AsComponent>
  )
}
