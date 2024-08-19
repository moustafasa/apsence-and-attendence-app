import { auth } from "@/auth";
import { getAttendences } from "./db";

export default async function modifiedGetAttendence(
  month?: number,
  userId?: DbUser["id"]
) {
  const data = await getAttendences(month, userId);
  let user = userId;
  if (!userId) {
    const session = await auth();
    user = session?.user.userId;
  }

  if (data.length <= 0) return [];
  return new Array(30).fill(3).map((ele, ind) => {
    const att = data.find((att) => att.id === ind + 1);
    return att
      ? att
      : {
          id: ind + 1,
          user,
          startDate: "",
          endDate: "",
          numberOfHours: 0,
        };
  });
}
