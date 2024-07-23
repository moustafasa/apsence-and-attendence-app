import { auth } from "@/auth";
import { getAttendences } from "./db";

export default async function modifiedGetAttendence() {
  const data = await getAttendences();
  const session = await auth();
  if (session?.user.userId)
    return new Array(30).fill(3).map((ele, ind) => {
      const att = data.find((att) => att.id === ind + 1);
      return att
        ? att
        : {
            id: ind + 1,
            userId: session.user.userId,
            startDate: "",
            endDate: "",
            numberOfHours: 0,
          };
    });
}
