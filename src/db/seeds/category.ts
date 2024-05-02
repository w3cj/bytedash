import type db from "@/db";
import categories from './data/categories.json';
import { category } from "../schema";

export default async function seed(db: db) {
  await db.insert(category).values(categories);
}
