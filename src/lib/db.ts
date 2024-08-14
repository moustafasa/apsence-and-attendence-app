import { auth } from "@/auth";
import { JSONFilePreset } from "lowdb/node";
import { cache } from "react";
import getDayDate from "./getDayDate";

const getDb = cache(async () => {
  const db = await JSONFilePreset<Db>("db.json", {
    users: [],
    employees: [],
    attendence: {},
  });
  await db.read();
  return db;
});

export const dbAuth = cache(async (credentials: DbUser) => {
  const db = await getDb();
  const users = db.data.users;
  const user = users.find(
    (user) =>
      user.username === credentials.username &&
      user.password === credentials.password
  );
  return user;
});

export const getEmployees = cache(async () => {
  const db = await getDb();
  return db.data.employees;
});

export const getEmployee = cache(async (id: number) => {
  const employees = await getEmployees();
  return employees.find((employee) => employee.id === id);
});

export const getAttendences = cache(async (month?: number) => {
  const session = await auth();
  const db = await getDb();
  const todayDate = getDayDate();
  const allAttendences = db.data.attendence[
    month || todayDate.getMonth().toString()
  ]?.find((att) => att.userId === session?.user.userId);

  return allAttendences
    ? allAttendences.days.toSorted((a, b) => a.id - b.id)
    : [];
});

export const setAttandence = cache(
  async (startDate: Date, endDate?: Date, month?: number) => {
    const db = await getDb();
    const session = await auth();
    if (session?.user) {
      db.update((data) => {
        const endDataSerialized = endDate?.toISOString() || "";
        const nowData = getDayDate();
        const attendences =
          data.attendence[month || nowData.getMonth()].find(
            ({ userId }) => userId
          )?.days || [];

        const numberOfHours = endDate
          ? endDate.getTime() - startDate.getTime()
          : 0;
        const att = attendences.find(({ id }) => id === startDate.getDate());

        if (att) {
          att.endDate = endDataSerialized;
          att.startDate = startDate.toISOString();
          att.numberOfHours = numberOfHours;
        } else {
          attendences.push({
            id: startDate.getDate(),
            startDate: startDate.toISOString(),
            endDate: endDataSerialized,
            numberOfHours,
          });
        }
      });
    }
  }
);

export const getSingleAttendence = cache(async (id: number, month?: number) => {
  const session = await auth();
  const attendences = await getAttendences(month);
  if (session?.user) return attendences.find((att) => att.id === id);
  else throw new Error("you must log in");
});

export const getUserMonthsMetaData = cache(async () => {
  const session = await auth();
  const db = await getDb();

  return Object.keys(db.data.attendence)
    .filter((month) =>
      db.data.attendence[month].find(
        (att) => att.userId === session?.user.userId
      )
    )
    .map((month) => ({
      month,
      completed: db.data.attendence[month].find(
        (att) => att.userId === session?.user.userId
      )?.completed,
    }));
});

export const clearThisMonthAttendence = cache(async () => {});
