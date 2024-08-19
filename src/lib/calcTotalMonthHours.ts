import { getAttendences, getSingleAttendence } from "./db";

export default async function calcTotalMonthHours(
  month?: number,
  id?: DbUser["id"]
) {
  const MonthAttendences = await getAttendences(month, id);
  return MonthAttendences.reduce((prev, curr) => prev + curr.numberOfHours, 0);
}
