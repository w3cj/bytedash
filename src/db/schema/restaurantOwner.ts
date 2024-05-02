import { integer, pgTable, serial, unique } from "drizzle-orm/pg-core";
import restaurant from "./restaurant";
import user from "./user";

const restaurantOwner = pgTable(
  "restaurant_owner",
  {
    id: serial("id").primaryKey(),
    restaurantId: integer("restaurant_id")
      .notNull()
      .references(() => restaurant.id),
    ownerId: integer("owner_id")
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      unqiueOwner: unique().on(table.restaurantId, table.ownerId)
    };
  }
);

export default restaurantOwner;
