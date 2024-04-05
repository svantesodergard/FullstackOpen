const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/blogs", (request, response) => {
  const blog = request.body.likes
    ? new Blog(request.body)
    : new Blog({ ...request.body, likes: 0 });

  if (!blog.url || !blog.title) {
    response.status(400).send();
    return;
  }

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
