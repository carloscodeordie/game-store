import 'server-only'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '../utils/constants'
import { getUserFromToken } from '../utils/auth'
import { delay } from '@/utils/delay'

export const getCurrentUser = cache(async () => {
  await delay()

  const serverCookies = await cookies()
  const token = serverCookies.get(COOKIE_NAME)
  if (!token) redirect('/signin')

  const user = getUserFromToken(token)
  if (!user) redirect('/signin')

  return user
})
