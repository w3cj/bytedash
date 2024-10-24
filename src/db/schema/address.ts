import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import city from "./city";
import user from "./user";
import { relations } from "drizzle-orm";

const address = pgTable("address", {
  id: serial().primaryKey(),
  streetAddress1: varchar("street_address_1", { length: 255 }).notNull(),
  streetAddress2: varchar("street_address_2", { length: 255 }),
  zipCode: varchar({ length: 16 }).notNull(),
  deliveryInstructions: varchar({ length: 255 }),
  userId: integer()
    .notNull()
    .references(() => user.id),
  cityId: integer()
    .notNull()
    .references(() => city.id),
  createdAt: timestamp({ mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "string" }).notNull().defaultNow(),
});

export const addressRelations = relations(address, ({ one }) => ({
  user: one(user, {
    fields: [address.userId],
    references: [user.id],
  }),
  city: one(city, {
    fields: [address.cityId],
    references: [city.id],
  }),
}));

export default address;
