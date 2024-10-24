import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

const category = pgTable(
  "category",
  {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull().unique(),
  }
);

export default category;
