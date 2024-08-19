import { auth } from "@/auth";
import { JSONFilePreset } from "lowdb/node";
import { cache } from "react";
import getDayDate from "./getDayDate";
import { Role } from "@/authTypes.d";
import { randomUUID } from "crypto";

const getDb = cache(async () => {
  const db = await JSONFilePreset<Db>("db.json", {
    users: [],
    employees: [],
    attendence: {},
    notifications: [],
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

export const getEmployee = cache(async (id: DbEmployeeUser["id"]) => {
  const employees = await getEmployees();
  return employees.find((employee) => employee.id === id);
});

export const getAttendences = cache(
  async (month?: number, userId?: DbUser["id"]) => {
    let user = userId;
    if (!user) {
      const session = await auth();
      user = session?.user.userId;
    }
    const db = await getDb();
    const todayDate = getDayDate();
    const allAttendences = db.data.attendence[
      month || todayDate.getMonth().toString()
    ]?.find((att) => att.userId === user);

    return allAttendences
      ? allAttendences.days.toSorted((a, b) => a.id - b.id)
      : [];
  }
);

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

export const getSingleAttendence = cache(
  async (id: Attendence["id"], month?: number) => {
    const session = await auth();
    const attendences = await getAttendences(month);
    if (session?.user) return attendences.find((att) => att.id === id);
    else throw new Error("you must log in");
  }
);

export const getUserMonthsMetaData = cache(async (userId?: DbUser["id"]) => {
  let user = userId;
  if (!user) {
    const session = await auth();
    user = session?.user.userId;
  }
  const db = await getDb();

  return Object.keys(db.data.attendence)
    .filter((month) =>
      db.data.attendence[month].find((att) => att.userId === user)
    )
    .map((month) => ({
      month,
      completed: db.data.attendence[month].find((att) => att.userId === user)
        ?.completed,
      paidSalary: db.data.attendence[month].find((att) => att.userId === user)
        ?.paidSalary,
    }));
});

export const clearThisMonthAttendence = cache(async () => {});

export const editEmployee = cache(
  async (id: DbEmployeeUser["id"], hourlyRate: number) => {
    const db = await getDb();
    db.update((data) => {
      const employee = data.employees.find((employee) => employee.id === id);
      if (employee) employee.hourlyRate = hourlyRate;
    });
  }
);

export const addEmployee = cache(
  async (employee: {
    name: string;
    username: string;
    password: string;
    hourlyRate: number;
  }) => {
    const db = await getDb();
    const id = randomUUID();
    db.update((data) => {
      data.users.push({
        id,
        name: employee.name,
        username: employee.username,
        password: employee.password,
        role: Role.EMPLOYEE,
      });
      data.employees.push({
        id,
        name: employee.name,
        hourlyRate: employee.hourlyRate,
      });
    });
  }
);

export const getMonthPaid = cache(
  async (month: number, userId: DbUser["id"], salary: number) => {
    const db = await getDb();
    db.update((data) => {
      const userAtt = data.attendence[month].find(
        (userAtt) => userAtt.userId === userId
      );
      if (userAtt) {
        userAtt.completed = true;
        userAtt.paidSalary = salary;
      }
    });
  }
);

export const addNotification = cache(
  async (notification: NotificationMessage) => {
    const db = await getDb();
    db.update((data) => {
      data.notifications.push(notification);
    });
  }
);

export const getNotificationOfUser = cache(async (id: number | string) => {
  const db = await getDb();
  return db.data.notifications.find((notif) => notif.to === id);
});
