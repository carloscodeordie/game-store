'use client'

import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/images/logo.png'
import { Button } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

const links = [
  { route: '/dashboard', name: 'Home' },
  { route: '/dashboard/customers', name: 'Customers' },
]

const isActive = (path: string, route: string) => {
  if (route === '/dashboard') {
    return path === '/dashboard'
  } else {
    return path.includes(route)
  }
}

const Side = () => {
  const path = usePathname()
  const activeClass = 'bg-blue-700 text-white'

  return (
    <div className="w-full h-full px-3 relative bg-white text-black">
      <div className="mb-12">
        <figure className="w-[250px] pt-4">
          <Image src={Logo} alt="Game Store logo" />
        </figure>
      </div>
      <div>
        {links.map((link) => (
          <div className="w-full" key={link.route}>
            <Link href={link.route}>
              <div
                className={`w-full h-full py-2 px-2 hover:bg-content1 rounded-lg ${
                  isActive(path, link.route) ? activeClass : ''
                }`}
              >
                {link.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full left-0 px-4 py-2">
        <Button
          fullWidth
          className="border rounded border-blue-700 bg-blue-500 text-white p-2 cursor-pointer"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default Side
