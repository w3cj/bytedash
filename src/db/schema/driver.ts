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
    id: serial("id").primaryKey(),
    carMake: varchar("car_make", { length: 255 }).notNull(),
    carModel: varchar("car_model", { length: 255 }).notNull(),
    carYear: integer("car_year").notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => user.id),
    online: boolean("online").notNull(),
    delivering: boolean("delivering").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
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
