import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv"; 
dotenv.config();

const app = express();
app.set("view engine", "ejs"); // Set EJS as the templating engine

// Use port from environment variable or default to 3000
const port = process.env.PORT2 || 3000;

// Use base URL of the deployed backend API
const API_URL = `https://my-personal-blog-j1cw.onrender.com`;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page with posts
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the new post creation page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

// Route to render the edit page for an existing post
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Route to create a new post
app.post("/api/posts", async (req, res) => {
  try {
    await axios.post(`${API_URL}/posts`, req.body);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
});

// Route to update an existing post
app.post("/api/posts/:id", async (req, res) => {
  try {
    await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating post" });
  }
});

// Route to delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(port, () => {
  console.log(`Frontend server running at http://localhost:${port}`);
});
