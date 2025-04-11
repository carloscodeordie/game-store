'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/utils/constants'
import { signup } from '@/utils/auth'
import { authSchema } from '@/schemas/schemas'
import { FormMessage } from '@/interfaces/interfaces'

export const registerUser = async (prevState: unknown, formData: FormData) => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  const serverCookies = await cookies()

  try {
    const { token } = await signup(data)
    serverCookies.set(COOKIE_NAME, token)
  } catch (error: unknown) {
    console.log('ERROR - Failed to sign up', error)
    const formError: FormMessage = {
      message: 'Failed to sign up',
    }
    return formError
  }

  redirect('/dashboard')
}
