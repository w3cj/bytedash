import {
  pgTable,
  serial,
  integer,
  timestamp,
  varchar,
  boolean,
  unique,
} from "drizzle-orm/pg-core";

import user from "./user";
import { relations } from "drizzle-orm";

const driver = pgTable(
  "driver",
  {
    id: serial().primaryKey(),
    carMake: varchar({ length: 255 }).notNull(),
    carModel: varchar({ length: 255 }).notNull(),
    carYear: integer().notNull(),
    userId: integer()
      .notNull()
      .references(() => user.id),
    online: boolean().notNull(),
    delivering: boolean().notNull(),
    createdAt: timestamp({ mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp({ mode: "string" })
      .notNull()
      .defaultNow(),
  }
);

export const driverRelations = relations(driver, ({ one }) => ({
  user: one(user, {
    fields: [driver.userId],
    references: [user.id],
  }),
}));

export default driver;
