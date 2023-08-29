import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const employees = sqliteTable("employees", {
    id: text("id").primaryKey(),
    email: text('email').notNull(),
    name: text('name').notNull(),
});