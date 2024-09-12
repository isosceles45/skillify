import { serial, text, varchar, pgTable } from "drizzle-orm/pg-core";

export const mockInterview = pgTable('mockInterview', {
    id:serial('id').primaryKey(),
    mockResponse:text('mockResponse').notNull(),
    jobRole:varchar('jobRole').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExp:varchar('jobExp').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull(),
})