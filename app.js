import express from "express";
import mongoose from "mongoose";

//defining PORT
const PORT = 5000;

//creating database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/pagination");
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

const app = express();

//using express parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//defining Schema for post
const postSchema = new mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

//creating mongoose model
const Post = new mongoose.model("Post", postSchema);

// for creating posts
app.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send("Post scuccessfully created");
  } catch (error) {
    res.status(500).send("Error creating post");
  }
});

//for fetching posts without pagination
app.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts) {
      return res.status(200).json({ posts });
    }
    res.status(404).send("posts not found");
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
});

//fetch data with pagination
// app.get("/", async (req, res) => {
//   try {
    //adding pagaination method 1 using skip and limit
//     const limitVal = req.query.limit || 2;
//     const skipVal = req.query.skip || 0;
//     const posts = await Post.find().limit(limitVal).skip(skipVal);
//     if (posts) {
//       return res.status(200).json({ posts });
//     }
//     res.status(404).send("posts not found");
//   } catch (error) {
//     res.status(500).send("Error fetching posts");
//   }
// });


//fetch data with pagination
// app.get("/", async (req, res) => {
//     try {
//       //adding pagaination method 1 using skip and limit
//       const posts = await Post.find().sort({ _id : -1}).limit(2).skip(4);
//       if (posts) {
//         return res.status(200).json({ posts });
//       }
//       res.status(404).send("posts not found");
//     } catch (error) {
//       res.status(500).send("Error fetching posts");
//     }
//   });

//listening to the server port 5000
app.listen(PORT, async () => {
  console.log("Server running on port", PORT);
  await connectDB();
});
