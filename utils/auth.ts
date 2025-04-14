import 'server-only'

import jwt from 'jsonwebtoken'
import { db } from '@/db/db'
import { users } from '@/db/schema'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'

const SECRET = 'use_an_ENV_VAR'

export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10)
}

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, SECRET)
  return token
}

export const signup = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const hashedPW = await hashPW(password)
  const rows = await db
    .insert(users)
    .values({ email, password: hashedPW })
    .returning({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt,
    })

  const user = rows[0]
  const token = createTokenForUser(user.id)

  return { user, token }
}

export const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW)
}

export const signin = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const match = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!match) throw new Error('invalid user')

  const correctPW = await comparePW(password, match.password)

  if (!correctPW) {
    throw new Error('invalud user')
  }

  const token = createTokenForUser(match.id)
  const user = {
    id: match.id,
    createdAt: match.createdAt,
    email: match.email,
  }

  return { user, token }
}

export const getUserFromToken = async (token: {
  name: string
  value: string
}) => {
  const payload = jwt.verify(token.value, SECRET) as { id: string }

  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.id),
    columns: {
      id: true,
      email: true,
      createdAt: true,
    },
  })

  return user
}
