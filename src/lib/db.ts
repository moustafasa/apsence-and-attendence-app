import { auth } from "@/auth";
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
  async (startDate: Date, endDate: Date, userId: number) => {
    const db = await getDb();

    db.update((data) => {
      const att = data.attendence.find(({ id }) => id === startDate.getDate());
      if (att) {
        att.endDate = endDate.toISOString();
        att.startDate = startDate.toISOString();
        att.numberOfHours = endDate.getTime() - startDate.getTime();
      } else {
        data.attendence.push({
          id: startDate.getDate(),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          userId,
          numberOfHours: endDate.getTime() - startDate.getTime(),
        });
      }
    });
  }
);

export const getAttendence = cache(async () => {
  const session = await auth();
  const db = await getDb();
  return db.data.attendence
    .filter((att) => att.userId === session?.user.userId)
    .toSorted((a, b) => a.id - b.id);
});
