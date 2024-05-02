import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

const state = pgTable(
  "state",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    code: varchar("code", { length: 2 }).notNull().unique(),
  }
);

export default state;
