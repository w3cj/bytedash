import {
  pgTable,
  serial,
  varchar,
  unique,
} from "drizzle-orm/pg-core";

const statusCatalog = pgTable(
  "status_catalog",
  {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull().unique(),
  }
);

export default statusCatalog;
