import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import city from "./city";
import { relations } from "drizzle-orm";
import menuItem from "./menuItem";
import order from "./order";

const restaurant = pgTable(
  "restaurant",
  {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    streetAddress: varchar({ length: 255 }).notNull(),
    zipCode: varchar({ length: 16 }).notNull(),
    cityId: integer()
      .notNull()
      .references(() => city.id),
    createdAt: timestamp({ mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp({ mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    nameIndex: index().on(table.name),
  })
);

export const restaurantRelations = relations(restaurant, ({ one, many }) => ({
  city: one(city, {
    fields: [restaurant.cityId],
    references: [city.id],
  }),
  menuItems: many(menuItem),
  orders: many(order),
}));

export default restaurant;
