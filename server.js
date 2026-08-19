const express = require('express');
const app = express();

app.use(express.json());

const blogs = [];
let idCounter = 1;

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.post('/api/blogs', (req, res) => {
  const { title, description, author } = req.body;
  
  if (!title || !description || !author) {
    return res.status(400).json({
      success: false,
      message: 'Title, description, and author are required',
      data: null
    });
  }
  
  const blog = {
    id: idCounter++,
    title,
    description,
    author
  };
  
  blogs.push(blog);
  
  res.status(201).json({
    success: true,
    message: 'Blog created successfully',
    data: blog
  });
});

app.get('/api/blogs', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Blogs retrieved successfully',
    data: blogs
  });
});

app.get('/api/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blog = blogs.find(b => b.id === id);
  
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: 'Blog not found',
      data: null
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Blog retrieved successfully',
    data: blog
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});