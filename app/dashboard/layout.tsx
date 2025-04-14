'use client'

import Shell from '@/components/Shell'
import { Spinner } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { JSX } from 'react'

function DashboardLayout(props: {
  children: JSX.Element
  videogames: JSX.Element
  rents: JSX.Element
}) {
  const path = usePathname()

  return (
    <Shell>
      {path === '/dashboard' ? (
        <div className="flex w-full h-full">
          <Spinner size="lg" color="white" />
          <div className="w-1/2 border-r border-default-50">
            {props.videogames}
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="border-b border-default-50 w-full h-1/2">
              {props.rents}
            </div>
            <div className="w-full h-1/2">{props.children}</div>
          </div>
        </div>
      ) : (
        <div>{props.children}</div>
      )}
    </Shell>
  )
}

export default DashboardLayout
