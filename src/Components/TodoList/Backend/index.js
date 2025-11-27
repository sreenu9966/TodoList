

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Todo from "./TodoModel.js";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://admin:yourpass123@todocluster.lyhtkbk.mongodb.net/?appName=TodoCluster")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// ROUTES
app.get("/todos", async (req, res) => {
  const data = await Todo.find();
  res.send(data);
});

app.post("/add-todo", async (req, res) => {
  const data = await Todo.create(req.body);
  res.send(data);
});

app.put("/update/:id", async (req, res) => {
  const data = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(data);
});

app.delete("/delete/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, () => console.log("Server running on port 5000"));
