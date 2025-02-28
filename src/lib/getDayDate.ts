export default function getDayDate(day?: number) {
  const nowDate = new Date();
  const todayDate = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    day ? day : nowDate.getDate()
  );
  return todayDate;
}
