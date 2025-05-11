import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  members: mongoose.Types.ObjectId[];
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;

