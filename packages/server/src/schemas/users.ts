import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role', ['freelance', 'client']);

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstname: varchar('firstname', { length: 255 }).notNull(),
    lastname: varchar('lastname', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    role: userRoleEnum('role').notNull()
})