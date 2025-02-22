import { Role } from "@/types/Enums";
import { model, models, Schema } from "mongoose";

const UsersSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: Number,
    enum: Object.values(Role)
      .filter((role) => !isNaN(+role))
      .map((role) => +role),
    default: Role.EMPLOYEE,
  },
  hourlyRate: {
    type: Number,
    required: function () {
      return this.role === Role.EMPLOYEE;
    },
  },
});

export default models.User || model("User", UsersSchema);
