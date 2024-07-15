export function getNumberOfPassedMonthDays() {
  const nowDate = new Date();
  const firstDayInMonth = new Date(nowDate.getFullYear(), nowDate.getMonth());
  const numberOfPassedDays = Math.ceil(
    (nowDate.valueOf() - firstDayInMonth.valueOf()) / 1000 / 60 / 60 / 24
  );
  return numberOfPassedDays;
}
