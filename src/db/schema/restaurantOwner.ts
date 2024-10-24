import { integer, pgTable, serial, unique } from "drizzle-orm/pg-core";
import restaurant from "./restaurant";
import user from "./user";

const restaurantOwner = pgTable(
  "restaurant_owner",
  {
    id: serial("id").primaryKey(),
    restaurantId: integer()
      .notNull()
      .references(() => restaurant.id),
    ownerId: integer()
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      unqiueOwner: unique("restaurant_owner_restaurant_id_owner_id_unique").on(table.restaurantId, table.ownerId)
    };
  }
);

export default restaurantOwner;
