import 'server-only'

import { memoize } from 'nextjs-better-unstable-cache'
import { eq, sql } from 'drizzle-orm'
import { db } from '@/db/db'
import { customers, rents, videogames } from '@/db/schema'
import { delay } from '@/utils/delay'

export const getRentsCount = memoize(
  async () => {
    await delay()
    const counts = await db
      .select({
        totalRents: sql<number>`count(distinct ${customers.id})`,
      })
      .from(videogames)
      .leftJoin(rents, eq(rents.videogameId, videogames.id))
      .leftJoin(customers, eq(customers.id, rents.customerId))
      .groupBy(videogames.id)
      .execute()

    const total = counts.reduce((acc, count) => acc + count.totalRents, 0)
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
