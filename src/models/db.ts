import { JSONFilePreset } from "lowdb/node";
import { cache } from "react";

export const getDb = cache(async () => {
  const db = await JSONFilePreset<Db>("db.json", {
    users: [],
    employees: [],
    attendence: {},
    notifications: [],
  });
  await db.read();
  return db;
});
