import 'server-only'

import { memoize } from 'nextjs-better-unstable-cache'
import { sql } from 'drizzle-orm'
import { db } from '@/db/db'
import { videogames } from '@/db/schema'
import { delay } from '@/utils/delay'

export const getVideogamesCount = memoize(
  async () => {
    await delay()

    const counts = await db
      .select({
        totalVideogames: sql<number>`count(distinct ${videogames.id})`,
      })
      .from(videogames)
      .execute()

    const total = counts.reduce((acc, count) => acc + count.totalVideogames, 0)
    return total
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:rents'],
    suppressWarnings: true,
    log: ['datacache', 'verbose'],
    logid: 'dashboard:rents',
  }
)
