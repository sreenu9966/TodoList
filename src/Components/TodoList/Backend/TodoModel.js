import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  nameTodo: String,
  todoDate: String,
  message: String
});

export default mongoose.model("Todo", todoSchema);
