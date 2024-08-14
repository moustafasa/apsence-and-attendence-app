import { NextResponse } from "next/server";
import Pusher from "pusher";

export function POST(req: Request) {
  const pusher = new Pusher({
    appId: process.env.API_ID as string,
    cluster: process.env.APP_CLUSTER as string,
    secret: process.env.APP_SECRET as string,
    key: process.env.APP_KEY as string,
  });
  pusher.trigger("channel", "event", { message: "test" });
  return NextResponse.json(null, { status: 200 });
}
