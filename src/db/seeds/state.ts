import type db from "@/db";
import states from './data/states.json';
import { state } from "../schema";

export default async function seed(db: db) {
  await db.insert(state).values(states);
}
