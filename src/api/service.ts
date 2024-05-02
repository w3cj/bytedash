import db from "@/db";
import { category, city, menuItem, order, restaurant, user } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";

export const ByteDashService = {
  getCategoriesQuery() {
    return db.query.category.findMany();
  },
  getCategoriesSelect() {
    return db.select().from(category);
  },
  getRestaurantsQueryRelated() {
    return db.query.restaurant.findMany({
      with: {
        city: {
          with: {
            state: true,
          },
        },
      },
    });
  },
  getRestaurantByIdQuery(restaurantId: number) {
    return db.query.restaurant.findFirst({
      where: eq(restaurant.id, restaurantId),
      with: {
        menuItems: {
          with: {
            category: true,
          },
        },
      },
    });
  },
  getRestaurantByIdSelect(restaurantId: number) {
    return db
      .select()
      .from(restaurant)
      .where(eq(restaurant.id, restaurantId))
      .leftJoin(menuItem, eq(menuItem.restaurantId, restaurant.id))
      .leftJoin(category, eq(menuItem.categoryId, category.id));
  },
  getRestaurantMenuByCategoryId(restaurantId: number, categoryId: number) {
    return db.query.restaurant.findFirst({
      where: eq(restaurant.id, restaurantId),
      with: {
        menuItems: {
          where: eq(menuItem.categoryId, categoryId),
          with: {
            category: true,
          },
        },
      },
    });
  },
  getRestaurantMenuByCategoryName(restaurantId: number, categoryName: string) {
    return db.query.restaurant.findFirst({
      where: eq(restaurant.id, restaurantId),
      with: {
        menuItems: {
          where: eq(
            menuItem.categoryId,
            db
              .select({ id: category.id })
              .from(category)
              .where(eq(category.name, categoryName))
          ),
          with: {
            category: true,
          },
        },
      },
    });
  },
  getRestaurantCustomers(restaurantId: number) {
    return db.query.user.findMany({
      where: inArray(
        user.id,
        db
          .select({ userId: order.userId })
          .from(order)
          .where(eq(order.restaurantId, restaurantId))
      ),
      with: {
        orders: {
          where: eq(order.restaurantId, restaurantId),
        },
      },
    });
  },
  getMenuItemsByCategoryByCity(cityName: string, categoryName: string) {
    return db.query.menuItem.findMany({
      where: and(
        eq(
          menuItem.categoryId,
          db
            .select({ id: category.id })
            .from(category)
            .where(eq(category.name, categoryName))
        ),
        inArray(
          menuItem.restaurantId,
          db
            .select({ id: restaurant.id })
            .from(restaurant)
            .where(
              eq(
                restaurant.cityId,
                db
                  .select({ id: city.id })
                  .from(city)
                  .where(eq(city.name, cityName))
              )
            )
        )
      ),
      with: {
        restaurant: {
          with: {
            city: true,
          },
        },
        category: true,
      },
    });
  },
};

export type ByteDashService = typeof ByteDashService;
