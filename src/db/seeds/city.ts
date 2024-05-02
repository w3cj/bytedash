import type db from "@/db";
import cities from "./data/cities.json";
import { city, state } from "../schema";
import { eq } from "drizzle-orm";

export default async function seed(db: db) {
  const insertable = await Promise.all(
    cities.map(async (city) => {
      const foundState = await db.query.state.findFirst({
        where: eq(state.name, city.stateName)
      });
      if (!foundState) {
        throw new Error("No state found with name: " + city.stateName);
      }
      return {
        ...city,
        stateId: foundState.id,
      };
    })
  );
  await db.insert(city).values(insertable);
}
