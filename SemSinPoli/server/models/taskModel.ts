import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
  id: string;
  year: number;
  month: number;
  week: number;
  data: Record<string, string>;
}

const TaskSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  week: { type: Number, required: true },
  data: { type: Map, of: String, required: true },
}, { timestamps: true });

export default mongoose.model<ITask>('Task', TaskSchema);
