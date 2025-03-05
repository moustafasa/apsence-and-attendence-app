"use server";
import { auth } from "@/auth";
import { makeNotificationAsReaded } from "../controllers/notificationController";
import { Role } from "@/types/Enums";

export async function readNotificationsAction() {
  const session = await auth();
  const currentUser = session?.user;
  if (currentUser)
    await makeNotificationAsReaded(
      currentUser?.role === Role.ADMIN ? "admin" : currentUser?.userId
    );
}
