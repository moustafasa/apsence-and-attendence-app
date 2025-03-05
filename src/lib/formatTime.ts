import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

export default function formatTime(time: Date, hour12: boolean = true) {
  return format(new TZDate(time), `hh:mm${hour12 ? " a" : ""}`);
}
