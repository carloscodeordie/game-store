import 'server-only'

import { db } from '@/db/db'
import { desc, eq, inArray } from 'drizzle-orm'
import { rents, customers, videogames } from '@/db/schema'
import { memoize } from 'nextjs-better-unstable-cache'
import { delay } from '@/utils/delay'

export const getRentsForDashboard = memoize(
  async () => {
    await delay()
    const videogamesList = await db.query.videogames.findMany({
      columns: {
        id: true,
      },
    })

    const videogamesIds = videogamesList.map((videogame) => videogame.id)
    if (!videogamesIds.length) return []

    const data = await db
      .selectDistinct()
      .from(customers)
      .where(inArray(rents.videogameId, videogamesIds))
      .leftJoin(rents, eq(customers.id, rents.customerId))
      .leftJoin(videogames, eq(rents.videogameId, videogames.id))
      .orderBy(desc(rents.createdAt))
      .execute()

    return data
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:rents'],
    suppressWarnings: true,
    log: ['datacache', 'verbose'],
    logid: 'dashboard:rents',
  }
)
