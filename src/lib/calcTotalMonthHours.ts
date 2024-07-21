import { getAttendences, getSingleAttendence } from "./db";

export default async function calcTotalMonthHours() {
  const MonthAttendences = await getAttendences();
  return MonthAttendences.reduce((prev, curr) => prev + curr.numberOfHours, 0);
}
