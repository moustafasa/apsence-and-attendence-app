import { model, models, Schema } from "mongoose";

const dayAttendenceSchema = new Schema<IDayAttendence>({
  dayIndex: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
});

dayAttendenceSchema.virtual("totalHours").get(function (this: IDayAttendence) {
  if (this.startDate && this.endDate) {
    const diff = this.endDate.getTime() - this.startDate.getTime();
    return diff / (1000 * 60 * 60); // convert milliseconds to hours
  }
  return 0;
});

const attendenceSchema = new Schema<IMonthAttendence>({
  monthIndex: { type: Number },
  completed: { type: Boolean, default: false },
  userId: { type: String, ref: "User" },
  paidSalary: { type: Number, default: 0, required: false },
  days: [dayAttendenceSchema],
});

export default models.Attendence || model("Attendence", attendenceSchema);
