import { Role } from "@/authTypes.d";
import { JSONFilePreset } from "lowdb/node";
import { cache } from "react";

const getDb = cache(async () => {
  const db = await JSONFilePreset<Db>("db.json", {
    users: [],
    attendence: [],
    employees: [],
  });
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

export const getEmployees = cache(async () => {
  const db = await getDb();
  return db.data.employees;
});

export const getEmployee = cache(async (id: number) => {
  const employees = await getEmployees();
  return employees.find((employee) => employee.id === id);
});

export const setAttandence = cache(
  async (start: string, end: string, dayDate: string, userId: number) => {
    const db = await getDb();

    // db.update((data) => {
    //   data.attendence.push({
    //     id: Math.random() * 3,
    //     start,
    //     endDate,
    //     userId,
    //     numberOfHours: 3,
    //   });
    // });
  }
);
