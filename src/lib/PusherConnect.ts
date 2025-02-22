"use server";
import Pusher from "pusher";
import { randomUUID } from "crypto";
import { addNotification } from "./controllers/notificationController";

const pusher = new Pusher({
  appId: process.env.APP_ID as string,
  cluster: process.env.APP_CLUSTER as string,
  secret: process.env.APP_SECRET as string,
  key: process.env.APP_KEY as string,
  useTLS: true,
});

export async function triggerNotification(
  notification: Omit<INotificationMsg, "_id" | "createdAt">
) {
  const newNotif = await addNotification({ ...notification });
  try {
    await pusher.trigger(notification.to.toString(), "notification", {
      message: JSON.stringify(newNotif),
    });
  } catch (e) {
    console.log(e);
  }
}
