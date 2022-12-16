import express from "express";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/pagination");
  } catch (error) {
    console.log(error);
  }
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const postSchema = new mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Post = new mongoose.model("Post", postSchema);

app.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send("Post scuccessfully created");
  } catch (error) {
    res.status(500).send("Error creating post");
  }
});
