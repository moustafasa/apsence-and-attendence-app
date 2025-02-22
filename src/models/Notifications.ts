import { NotificationTypes } from "@/types/Enums";
import { model, models, Schema } from "mongoose";
import Users from "./Users";

const notificationSchema = new Schema<INotificationMsg>(
  {
    from: { type: String, required: true, ref: "User" },
    to: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: {
      type: String,
      enum: Object.values(NotificationTypes)
        .filter((role) => !isNaN(+role))
        .map((role) => +role),
    },
  },
  { timestamps: true }
);

Users;
export default models.Notification || model("Notification", notificationSchema);
