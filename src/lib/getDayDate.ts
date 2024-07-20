export default function getDayDate(day?: number) {
  const nowDate = new Date();
  const todayDate = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    day
      ? day
      : nowDate.getHours() > 5
      ? nowDate.getDate()
      : nowDate.getDate() - 1
  );
  return todayDate;
}
