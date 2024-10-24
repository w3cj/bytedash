import {
  pgTable,
  serial,
  integer,
  timestamp,
  numeric,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import restaurant from "./restaurant";
import user from "./user";
import driver from "./driver";
import address from "./address";
import orderStatus from "./orderStatus";

const order = pgTable("orders", {
  id: serial().primaryKey(),
  restaurantId: integer()
    .notNull()
    .references(() => restaurant.id),
  estimatedDeliveryTime: timestamp({
    mode: "string",
  }).notNull(),
  actualDeliveryTime: timestamp({ mode: "string" }),
  deliveryAddressId: integer()
    .notNull()
    .references(() => address.id),
  userId: integer()
    .notNull()
    .references(() => user.id),
  driverId: integer().references(() => driver.id),
  price: numeric({ precision: 12, scale: 2 }).notNull(),
  discount: numeric({ precision: 12, scale: 2 }).notNull(),
  finalPrice: numeric({ precision: 12, scale: 2 }).notNull(),
  comment: text(),
  createdAt: timestamp({ mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "string" }).notNull().defaultNow(),
});

export const orderRelations = relations(order, ({ one, many }) => ({
  restaurant: one(restaurant, {
    fields: [order.restaurantId],
    references: [restaurant.id],
  }),
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
  driver: one(driver, {
    fields: [order.driverId],
    references: [driver.id],
  }),
  address: one(address, {
    fields: [order.deliveryAddressId],
    references: [address.id],
  }),
  orderStatuses: many(orderStatus),
}));

export default order;
