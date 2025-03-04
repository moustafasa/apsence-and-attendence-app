import { auth } from "@/auth";
import dbConnect from "@/config/dbConnect";
import Notifications from "@/models/Notifications";
import { HydratedDocument } from "mongoose";
import { cache } from "react";

export const addNotification = cache(
  async (notification: Omit<INotificationMsg, "_id" | "createdAt">) => {
    const session = await auth();
    if (!session?.user) return null;
    await dbConnect();
    const notif: HydratedDocument<INotificationMsg> =
      await Notifications.create(notification);

    return {
      ...notif.toObject(),
      from: { name: session.user.name, _id: session.user.userId },
    };
  }
);

export const getNotificationOfUser = cache(async (id: string) => {
  await dbConnect();
  const notifications = await Notifications.find({ to: id })
    .populate("from", "name")
    .sort({ createdAt: -1 })
    .lean<INotificationsMsgPopulated[]>();

  return notifications.map((notif) => ({
    ...notif,
    _id: notif._id.toString(),
  }));
});

export const getUnReadNotifCount = cache(async (id: string) => {
  await dbConnect();
  const count = await Notifications.countDocuments({ to: id, read: false });
  return count;
});

export async function makeNotificationAsReaded(to: INotificationMsg["to"]) {
  await dbConnect();
  const notifs = await Notifications.find<HydratedDocument<INotificationMsg>>({
    to,
    read: false,
  });
  const savePromises = notifs.map(async (notif) => {
    notif.read = true;
    return notif.save();
  });
  await Promise.all(savePromises);
}
