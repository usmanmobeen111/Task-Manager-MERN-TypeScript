import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  deadline: Date;
  priority: "high" | "medium" | "low";
  tags?: string;
  status: "pending" | "processing" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxLength: [100, "Title cannot be more than 100"],
  },
  description: {
    type: String,
    trim: true,
    maxLength: [500, "Description cannot be more than 500"],
  },
  deadline: {
    type: Date,
    required: [true, "Deadline is required"],
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  tags: {
    type: String,
    trim: true,
    lowercase: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.pre<ITask>("save", function () {
  this.updatedAt = new Date();
});

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
