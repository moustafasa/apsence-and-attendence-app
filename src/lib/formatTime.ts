import { format } from "date-fns";

export default function formatTime(time: Date, hour12: boolean = true) {
  console.log(Intl.DateTimeFormat().resolvedOptions().timeZoneName);
  return format(time.toString(), `hh:mm${hour12 ? " a" : ""}`);
}
