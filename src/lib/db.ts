import data from "@/db.json";
import { JSONFilePreset } from "lowdb/node";

export async function getDb() {
  const db = await JSONFilePreset("db.json", data);
  db.update(({ users }) =>
    users.push({
      name: "dr-abeer",
      username: "abeer",
      password: "123456",
      role: 0,
    })
  );

  await db.write();
  return db;
}
