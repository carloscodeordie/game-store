import 'server-only'

import { db } from '@/db/db'
import { asc } from 'drizzle-orm'
import { videogames } from '@/db/schema'
import { memoize } from 'nextjs-better-unstable-cache'
import { delay } from '@/utils/delay'

export const getVideogamesForDashboard = memoize(
  async () => {
    await delay()

    const data = await db.query.videogames.findMany({
      columns: {
        id: true,
        name: true,
        description: true,
      },
      with: {
        rents: true,
      },
      orderBy: [asc(videogames.createdAt)],
    })

    return data ?? []
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:videogames'],
    suppressWarnings: true,
    log: ['datacache', 'verbose'],
    logid: 'dashboard:videogames',
  }
)
