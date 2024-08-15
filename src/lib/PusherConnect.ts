"use server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.APP_ID as string,
  cluster: process.env.APP_CLUSTER as string,
  secret: process.env.APP_SECRET as string,
  key: process.env.APP_KEY as string,
});

export async function pusherConnect() {
  await pusher.trigger("channel", "event", { message: "test" });
}

export async function triggerNotification(notification: NotificationMessage) {
  await pusher.trigger("notification", "new", {
    message: JSON.stringify(notification),
  });
}
