import {
  pgTable,
  serial,
  integer,
  numeric,
  text,
} from "drizzle-orm/pg-core";

import order from "./order";
import menuItem from "./menuItem";
import { relations } from "drizzle-orm";

const orderMenuItem = pgTable("order_menu_item", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => order.id),
  menuItemId: integer("menu_item_id").notNull().references(() => menuItem.id),
  quantity: integer("quantity").notNull(),
  itemPrice: numeric("item_price", { precision: 12, scale: 2 }).notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  comment: text("comment"),
});

export const orderMenuItemRelations = relations(orderMenuItem, ({ one }) => ({
  order: one(order, {
    fields: [orderMenuItem.orderId],
    references: [order.id],
  }),
  menuItem: one(menuItem, {
    fields: [orderMenuItem.menuItemId],
    references: [menuItem.id],
  }),
}));

export default orderMenuItem;
