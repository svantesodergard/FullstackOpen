const blogRouter = require("express").Router();
const { request } = require("express");
const Blog = require("../models/blog");

blogRouter.get("/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.delete("/blogs/:id", (request, response) => {
  Blog.findByIdAndDelete(request.params.id).then(response.status(204).send());
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

blogRouter.put("/blogs/:id", (request, response) => {
  const id = request.params.id;
  const blog = { _id: id, ...request.body };

  Blog.findByIdAndUpdate({ _id: id }, blog).then((result) => {
    response.json(result);
  });
});

module.exports = blogRouter;
