export default function convertMillSecondsToHours(millseconds: number) {
  return +(millseconds / 1000 / 60 / 60).toFixed(2);
}
