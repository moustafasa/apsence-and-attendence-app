"use server";

import Pusher from "pusher";

export async function pusherConnect() {
  const pusher = new Pusher({
    appId: process.env.APP_ID as string,
    cluster: process.env.APP_CLUSTER as string,
    secret: process.env.APP_SECRET as string,
    key: process.env.APP_KEY as string,
  });
  await pusher.trigger("channel", "event", { message: "test" });
}
