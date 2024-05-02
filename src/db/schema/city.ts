import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

import state from "./state";
import { relations } from "drizzle-orm";

const city = pgTable(
  "city",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    stateId: integer("state_id")
      .notNull()
      .references(() => state.id),
  },
  (table) => {
    return {
      cityAk1: unique("city_ak_1").on(table.name, table.stateId),
    };
  }
);

export const cityRelations = relations(city, ({ one }) => ({
  state: one(state, {
    fields: [city.stateId],
    references: [state.id],
  }),
}));

export default city;
