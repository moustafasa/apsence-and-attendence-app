"use server";
import Pusher from "pusher";
import { addNotification } from "./db";

const pusher = new Pusher({
  appId: process.env.APP_ID as string,
  cluster: process.env.APP_CLUSTER as string,
  secret: process.env.APP_SECRET as string,
  key: process.env.APP_KEY as string,
});

export async function triggerNotification(notification: NotificationMessage) {
  await pusher.trigger(notification.to.toString(), "notification", {
    message: JSON.stringify(notification),
  });
  await addNotification(notification);
}
