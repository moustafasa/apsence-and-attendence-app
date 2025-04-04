import { auth } from "@/auth";
import { getNotificationOfUser } from "@/lib/controllers/notificationController";
import { Role } from "@/types/Enums";

export const GET = auth(async (req) => {
  const user = req.auth?.user;
  if (!user) return new Response(null, { status: 401 });
  const notification = await getNotificationOfUser(
    user.role === Role.ADMIN ? "admin" : user.userId
  );
  return Response.json(notification);
});
