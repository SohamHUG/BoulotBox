import { relations } from "drizzle-orm";
import { missions, users } from "./index";

export const usersRelations = relations(users, ({ many }) => ({
    missionsPublished: many(missions)
}));

export const missionsRelations = relations(missions, ({ one }) => ({
    publishedBy: one(users, {
        fields: [missions.publishedBy],
        references: [users.id]
    })
}));