import { eq } from "drizzle-orm";
import type db from "@/db";
import * as schema from "@/db/schema";
import restaurants from "./data/restaurants.json";

async function getCategoryId(db: db, categoryName: string) {
  const category = await db.query.category.findFirst({
    where: eq(schema.category.name, categoryName),
  });
  if (!category) {
    throw new Error("Unknown menu item category: " + categoryName);
  }
  return category.id;
}

export default async function seed(db: db) {
  await Promise.all(
    restaurants.map(async (restaurant) => {
      const foundCity = await db.query.city.findFirst({
        where: eq(schema.city.name, restaurant.cityName),
      });
      if (!foundCity) {
        throw new Error("No city found with name:" + restaurant.cityName);
      }
      const [insertedRestaurant] = await db
        .insert(schema.restaurant)
        .values({
          ...restaurant,
          cityId: foundCity.id,
        })
        .returning();
      await Promise.all(restaurant.menuItems?.map(async (menuItem) => {
        const categoryId = await getCategoryId(db, menuItem.categoryName);
        await db.insert(schema.menuItem).values({
          ...menuItem,
          categoryId,
          restaurantId: insertedRestaurant.id,
        })
      }) || []);
    })
  );
}
