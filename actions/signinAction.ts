'use server'

import { authSchema } from '@/schemas/schemas'
import { signin } from '@/utils/auth'
import { COOKIE_NAME } from '@/utils/constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signinUser = async (prevState: unknown, formData: FormData) => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  const serverCookies = await cookies()

  try {
    const { token } = await signin(data)
    serverCookies.set(COOKIE_NAME, token)
  } catch (e) {
    console.error(e)
    return { message: 'Failed to sign you in' }
  }
  redirect('/dashboard')
}
