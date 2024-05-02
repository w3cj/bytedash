import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import order from "./order";
import statusCatalog from "./statusCatalog";

const orderStatus = pgTable("order_status", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => order.id),
  statusCatalogId: integer("status_catalog_id")
    .notNull()
    .references(() => statusCatalog.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const orderStatusRelations = relations(orderStatus, ({ one }) => ({
  order: one(order, {
    fields: [orderStatus.orderId],
    references: [order.id],
  }),
  statusCatalog: one(statusCatalog, {
    fields: [orderStatus.statusCatalogId],
    references: [statusCatalog.id],
  }),
}));

export default orderStatus;
