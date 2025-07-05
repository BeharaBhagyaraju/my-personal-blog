import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"; 
dotenv.config(); 

const app = express();
const port = process.env.PORT || 4000; // ✅ use Render-compatible PORT

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content: "Decentralized Finance (DeFi) is an emerging and rapidly evolving field...",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content: "Artificial Intelligence (AI) is no longer a concept of the future...",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content: "Sustainability is more than just a buzzword...",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Get post by ID
app.get("/posts/:id", (req, res) => {
  const resultid = parseInt(req.params.id);
  const resultans = posts.find((post) => post.id === resultid);
  if (!resultans) return res.status(404).json({ message: "post not found" });
  res.json(resultans);
});

// Create a new post
app.post("/posts", (req, res) => {
  const newpost = {
    id: ++lastId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  posts.push(newpost);
  res.status(201).json(newpost);
});

// Update an existing post
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return res.status(404).json({ message: "post not found to delete" });

  posts.splice(index, 1);
  res.json({ message: "post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
