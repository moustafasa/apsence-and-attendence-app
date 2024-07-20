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

export const setAttandence = cache(async (startDate: Date, endDate?: Date) => {
  const db = await getDb();
  const session = await auth();
  if (session?.user) {
    db.update((data) => {
      const endDataSerialized = endDate?.toISOString() || "";
      const numberOfHours = endDate
        ? endDate.getTime() - startDate.getTime()
        : 0;
      const att = data.attendence.find(
        ({ id, userId: user }) =>
          id === startDate.getDate() && user === session.user.userId
      );

      if (att) {
        att.endDate = endDataSerialized;
        att.startDate = startDate.toISOString();
        att.numberOfHours = numberOfHours;
      } else {
        data.attendence.push({
          id: startDate.getDate(),
          startDate: startDate.toISOString(),
          endDate: endDataSerialized,
          userId: session?.user.userId,
          numberOfHours,
        });
      }
    });
  }
});

export const getAttendences = cache(async () => {
  const session = await auth();
  const db = await getDb();
  return db.data.attendence
    .filter((att) => att.userId === session?.user.userId)
    .toSorted((a, b) => a.id - b.id);
});

export const getSingleAttendence = cache(async (id: number) => {
  const session = await auth();
  const db = await getDb();
  if (session?.user)
    return db.data.attendence.find(
      (att) => att.userId === session.user.userId && att.id === id
    );
  else throw new Error("you must log in");
});
