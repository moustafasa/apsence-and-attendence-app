import { Role } from "@/authTypes.d";
import { JSONFilePreset } from "lowdb/node";
import { cache } from "react";

const getDb = cache(async () => {
  const db = await JSONFilePreset<Db>("db.json", { users: [] });
  await db.read();
  return db;
});

export async function dbAuth(credentials: DbUser) {
  const db = await getDb();
  const users = db.data.users;
  const user = users.find(
    (user) =>
      user.username === credentials.username &&
      user.password === credentials.password
  );
  return user;
}

export const getEmployee = cache(async () => {
  const db = await getDb();
  return db.data.users.filter((user) => user.role === Role.EMPLOYEE);
});
