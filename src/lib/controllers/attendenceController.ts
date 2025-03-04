import { auth } from "@/auth";
import { cache } from "react";
import getDayDate from "../getDayDate";
import dbConnect from "@/config/dbConnect";
import Attendence from "@/models/Attendence";
import { HydratedDocument } from "mongoose";

export const getMonthAttendence = cache(async function (
  month?: number,
  userId?: IUser["_id"]
) {
  let user = userId;
  if (!user) {
    const session = await auth();
    user = session?.user.userId;
  }

  await dbConnect();
  const attendence = await Attendence.findOne<
    HydratedDocument<IMonthAttendence>
  >({
    monthIndex: month ?? getDayDate().getMonth(),
    userId: user,
  });
  return attendence;
});

export const getAttendences = cache(
  async (month?: number, userId?: IUser["_id"]) => {
    const allAttendences = await getMonthAttendence(month, userId);

    return allAttendences?.toObject({ virtuals: true }).days || [];
  }
);

export const setAttandence = cache(
  async (startDate: Date, endDate?: Date, userId?: string, month?: number) => {
    const dayIndex = startDate.getDate();
    const monthIndex = month || getDayDate().getMonth();
    if (!userId) {
      const session = await auth();
      if (!session?.user) return;
      userId = session.user.userId;
    }

    const attendence = await getMonthAttendence(monthIndex, userId);

    if (!attendence) {
      const newAttendence = new Attendence({
        monthIndex,
        userId,
        days: [
          {
            dayIndex,
            startDate,
            endDate,
          },
        ],
      });
      await newAttendence.save();
    } else {
      const foundAtt = attendence.days.find((day) => day.dayIndex === dayIndex);
      if (foundAtt) {
        foundAtt.startDate = startDate;
        foundAtt.endDate = endDate;
      } else {
        attendence.days.push({
          dayIndex,
          startDate,
          endDate,
        });
      }
      await attendence.save();
    }
  }
);

export const getSingleAttendence = cache(
  async (
    dayIndex?: IDayAttendence["dayIndex"],
    userId?: string,
    month?: number
  ) => {
    const attendence = await getMonthAttendence(month, userId);

    return {
      _id: attendence?._id,
      completed: attendence?.completed,

      // if not dayIndex i will return the last day that not ended OR the current day
      days: dayIndex
        ? attendence?.days.find((day) => day.dayIndex === dayIndex)
        : attendence?.days
            ?.toSorted((a, b) => a.dayIndex - b.dayIndex)
            .findLast((day) => !day.endDate) ||
          attendence?.days.findLast(
            (day) => day.dayIndex === getDayDate().getDate()
          ),
    };
  }
);

export async function calcTotalMonthHours(month?: number, id?: IUser["_id"]) {
  if (!id) {
    const session = await auth();
    if (!session?.user) {
      return 0;
    }
    id = session.user.userId;
  }
  const pipeline = [
    {
      $match: { monthIndex: month ?? getDayDate().getMonth(), userId: id },
    },
    {
      $addFields: {
        totalMonthHours: {
          $sum: {
            $map: {
              input: "$days",
              as: "day",
              in: {
                $divide: [
                  {
                    $subtract: ["$$day.endDate", "$$day.startDate"],
                  },
                  1000 * 60 * 60,
                ],
              },
            },
          },
        },
      },
    },
    { $group: { _id: "$totalMonthHours" } },
  ];
  await dbConnect();
  const monthAttendence = await Attendence.aggregate(pipeline);
  return monthAttendence[0]?._id || 0;
}

export const getUserMonthsMetaData = cache(async (userId?: IUser["_id"]) => {
  if (!userId) {
    const session = await auth();
    if (!session?.user.userId) return [];
    userId = session.user.userId;
  }
  await dbConnect();
  const monthMetas = await Attendence.find<
    Pick<IMonthAttendence, "_id" | "completed" | "monthIndex" | "paidSalary">[]
  >({ userId }, "completed paidSalary monthIndex", {
    sort: "monthIndex",
  }).lean<
    Pick<IMonthAttendence, "_id" | "completed" | "monthIndex" | "paidSalary">[]
  >();

  return monthMetas;
});

export const clearThisMonthAttendence = cache(async () => {});

export const getMonthPaid = cache(
  async (month: number, userId: IUser["_id"], salary: number) => {
    await dbConnect();
    await Attendence.findOneAndUpdate(
      {
        userId,
        monthIndex: month,
      },
      {
        $set: {
          completed: true,
          paidSalary: salary,
        },
      }
    );
  }
);
