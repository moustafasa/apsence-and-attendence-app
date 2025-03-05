import { tz } from "@date-fns/tz";
import { format } from "date-fns";

export default function formatTime(time: Date, formatStr: string) {
  return format(time.toString(), formatStr, {
    in: tz("Africa/Cairo"),
  });
}
