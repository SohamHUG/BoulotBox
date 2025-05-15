import { numeric, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const missionStatusEnum = pgEnum('mission_status', ['pending', 'in_progress', 'completed']);

export const missions = pgTable('missions', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    shortDescription: varchar('short_description', { length: 255 }),
    longDescription: text('long_description').notNull(),
    budget: numeric('budget', { precision: 10, scale: 2 }).notNull(),
    deadLine: timestamp('deadline', { withTimezone: false }).notNull(),
    status: missionStatusEnum('status').notNull(),
    publishedBy: uuid('published_by').references(() => users.id, { onDelete: "cascade" }).notNull(),
    publishedOn: timestamp('published_on').defaultNow()
})