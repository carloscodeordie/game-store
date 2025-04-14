'use server'

import { getVideogamesForDashboard } from '@/actions/videogamesAction'
import Link from 'next/link'

const VideogamesSlot = async () => {
  const videogames = await getVideogamesForDashboard()

  return (
    <div className="w-full h-full p-4 flex justify-center">
      <div className="w-full">
        <h2 className="text-center text-xl">List of videogames</h2>
        <div className="rounded-md border border-default-100 my-8">
          {videogames.map((videogame) => (
            <div
              key={videogame.id}
              className="border-b border-default-100 p-2 flex gap-2 justify-between"
            >
              <Link href={`/dashboard/events/${videogame.id}`}>
                <span>{videogame.name}</span>
              </Link>
              <p className="text-gray-500">{videogame.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideogamesSlot
