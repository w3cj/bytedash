import { and, eq } from "drizzle-orm";
import type db from "@/db";
import * as schema from "@/db/schema";
import orders from "./data/orders.json";

const statuses = ["New", "Confirmed", "Preparing", "ReadyForDelivery", "OutForDelivery", "Delivered"];

async function getStatusCatalogId(db: db, statusCatalog: string) {
  const foundStatusCatalog = await db.query.statusCatalog.findFirst({
    where: eq(schema.statusCatalog.name, statusCatalog),
  });
  if (!foundStatusCatalog) {
    throw new Error("No status catalog found with name:" + statusCatalog);
  }
  return foundStatusCatalog.id;
}

export default async function seed(db: db) {
  await Promise.all(
    orders.map(async (order) => {
      const foundUser = await db.query.user.findFirst({
        where: eq(schema.user.name, order.customer_name),
      });
      if (!foundUser) {
        throw new Error("No user found with name:" + order.customer_name);
      }
      const foundRestaurant = await db.query.restaurant.findFirst({
        where: eq(schema.restaurant.name, order.restaurant_name),
      });
      if (!foundRestaurant) {
        throw new Error(
          "No restaurant found with name:" + order.restaurant_name
        );
      }
      const foundAddress = await db.query.address.findFirst({
        where: eq(
          schema.address.streetAddress1,
          order.delivery_street_address
        ),
      });
      if (!foundAddress) {
        throw new Error(
          "No address found with:" + order.delivery_street_address
        );
      }
      let price = 0;
      const menuItems = await Promise.all(
        order.order_items.map(async (item) => {
          const dbItem = await db.query.menuItem.findFirst({
            where: and(
              eq(schema.menuItem.name, item.menu_item_name),
              eq(schema.menuItem.restaurantId, foundRestaurant.id)
            ),
          });
          if (!dbItem) {
            throw new Error(
              "No menu item found with: name - " +
                item.menu_item_name +
                " | restaurant - " +
                foundRestaurant.id
            );
          }
          price += item.quantity * Number(dbItem.price);
          return {
            dbItem,
            item,
          };
        })
      );
      const [insertedOrder] = await db
        .insert(schema.order)
        .values({
          ...order,
          price: price.toFixed(2),
          finalPrice: price.toFixed(2),
          deliveryAddressId: foundAddress.id,
          restaurantId: foundRestaurant.id,
          userId: foundUser.id,
        })
        .returning();

      await Promise.all(menuItems.map(async ({ dbItem, item }) => {
        await db.insert(schema.orderMenuItem).values({
          quantity: item.quantity,
          price: (Number(dbItem.price) * item.quantity).toFixed(2),
          itemPrice: dbItem.price,
          orderId: insertedOrder.id,
          menuItemId: dbItem.id,
        })
      }));

      let startTime = new Date(insertedOrder.createdAt);
      let endTime = new Date(insertedOrder.actualDeliveryTime || startTime);
      let total = endTime.getTime() - startTime.getTime();
      let increment = total / statuses.length;
      let currentTime = startTime;
      for (let statusCatalog of statuses) {
        await db.insert(schema.orderStatus).values({
          orderId: insertedOrder.id,
          statusCatalogId: await getStatusCatalogId(db, statusCatalog),
          createdAt: currentTime.toUTCString(),
        });
        currentTime =  new Date(currentTime.getTime() + increment);
      }
    })
  );
}
