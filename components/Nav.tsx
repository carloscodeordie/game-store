'use client'

import { createNewVideogame } from '@/actions/createNewVideogame'
import { Input } from '@nextui-org/react'
import { Button, Tooltip } from '@nextui-org/react'
import { CirclePlus } from 'lucide-react'
import { useTransition } from 'react'

const Nav = () => {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => {
      createNewVideogame()
    })
  }

  return (
    <nav className="h-[65px] border-b border-default-50 flex items-center px-6 gap-4">
      <div>
        <Tooltip content="New Event">
          <Button
            isLoading={isPending}
            isIconOnly
            variant="ghost"
            size="sm"
            onClick={handleClick}
            className="cursor-pointer"
          >
            <CirclePlus size={16} />
          </Button>
        </Tooltip>
      </div>
      <div className="w-1/2">
        <Input size="sm" variant="faded" placeholder="search" />
      </div>
    </nav>
  )
}

export default Nav
