import { randomUUID } from 'crypto'
import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'

const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const createdAt = () =>
  text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()

export const users = sqliteTable('users', {
  id: id(),
  createdAt: createdAt(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  videogames: many(videogames),
}))

export const videogames = sqliteTable(
  'videogames',
  {
    id: id(),
    createdAt: createdAt(),
    name: text('name').notNull(),
    createdById: text('createdById').notNull(),
    description: text('description'),
  },
  (table) => ({
    unq: unique().on(table.createdById, table.name),
  })
)

export const videogamesRelations = relations(videogames, ({ many, one }) => ({
  rents: many(rents),
  createdBy: one(users, {
    references: [users.id],
    fields: [videogames.createdById],
  }),
}))

export const customers = sqliteTable('customers', {
  id: id(),
  createdAt: createdAt(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
})

export const customersRelations = relations(customers, ({ many }) => ({
  rents: many(rents),
}))

export const rents = sqliteTable(
  'rents',
  {
    id: id(),
    createdAt: createdAt(),
    customerId: text('customerId'),
    videogameId: text('videogameId'),
    status: text('status', {
      enum: ['available', 'rented'],
    })
      .default('available')
      .notNull(),
  },
  (table) => ({
    unq: unique().on(table.customerId, table.videogameId),
  })
)

export const rentsRelations = relations(rents, ({ one }) => ({
  customer: one(customers, {
    fields: [rents.customerId],
    references: [customers.id],
  }),
  videogame: one(videogames, {
    fields: [rents.videogameId],
    references: [videogames.id],
  }),
}))
