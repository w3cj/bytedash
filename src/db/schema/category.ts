import { pgTable, serial, varchar, unique } from "drizzle-orm/pg-core";

const category = pgTable(
  "category",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
  }
);

export default category;
