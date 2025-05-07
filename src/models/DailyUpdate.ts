import mongoose from "mongoose";

const dailyUpdateSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const DailyUpdate = mongoose.model("DailyUpdate", dailyUpdateSchema);
export default DailyUpdate;
