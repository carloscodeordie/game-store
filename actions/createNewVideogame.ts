'use server'

import { db } from '@/db/db'
import { videogames } from '@/db/schema'
import { delay } from '@/utils/delay'

import { revalidateTag } from 'next/cache'
import { getCurrentUser } from './usersAction'

import { uniqueNamesGenerator, Config, names } from 'unique-names-generator'

const config: Config = {
  dictionaries: [names],
}

export const createNewVideogame = async () => {
  await delay()
  const user = await getCurrentUser()

  await db.insert(videogames).values({
    createdById: user ? user.id : 'unknown',
    description: `Game developed by ${uniqueNamesGenerator(config)}`,
    createdAt: new Date().toUTCString(),
    name: uniqueNamesGenerator(config),
  })

  revalidateTag('dashboard:videogames')
  revalidateTag('dashboard:rents')
}
