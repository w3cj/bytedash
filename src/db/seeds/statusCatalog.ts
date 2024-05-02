import type db from "@/db";
import statusCatalogs from './data/statusCatalogs.json';
import { statusCatalog } from "../schema";

export default async function seed(db: db) {
  await db.insert(statusCatalog).values(statusCatalogs);
}
