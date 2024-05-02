import { rpcClient } from "typed-rpc";
import type { ByteDashService } from "@/api/service";

const client = rpcClient<ByteDashService>("http://localhost:3000/api");

try {
  // const categories = await client.getCategoriesSelect();
  // console.log(categories);

  // const restaurants = await client.getRestaurantsQueryRelated();
  // console.log(restaurants);

  // const restaurant = await client.getRestaurantByIdQuery(17);
  // console.log(restaurant);

  // const restaurant = await client.getRestaurantByIdSelect(17);
  // console.log(restaurant);

  // const restaurantWithMenuCategory = await client.getRestaurantMenuByCategoryName(3, "Dinner");
  // console.log(restaurantWithMenuCategory);

  // const customers = await client.getRestaurantCustomers(5);
  // console.log(customers);

  const menuItems = await client.getMenuItemsByCategoryByCity("New York", "Desserts");
  console.log(menuItems);
} catch (error) {
  console.error(error);
}

