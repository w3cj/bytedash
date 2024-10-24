import {
  pgTable,
  serial,
  integer,
  varchar,
  numeric,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import category from "./category";
import restaurant from "./restaurant";
import { relations } from "drizzle-orm";

const menuItem = pgTable("menu_item", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  restaurantId: integer()
    .notNull()
    .references(() => restaurant.id),
  categoryId: integer()
    .notNull()
    .references(() => category.id),
  description: text().notNull(),
  ingredients: text().notNull(),
  price: numeric({ precision: 12, scale: 2 }).notNull(),
  active: boolean().notNull(),
  createdAt: timestamp({ mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "string" }).notNull().defaultNow(),
});

export const menuItemRelations = relations(menuItem, ({ one }) => ({
  restaurant: one(restaurant, {
    fields: [menuItem.restaurantId],
    references: [restaurant.id],
  }),
  category: one(category, {
    fields: [menuItem.categoryId],
    references: [category.id],
  }),
}));

export default menuItem;
