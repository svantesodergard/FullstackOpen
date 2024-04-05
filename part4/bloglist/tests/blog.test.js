const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("assert");

const api = supertest(app);
const Blog = require("../models/blog");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = blogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((blog) => blog.save());
  await Promise.all(promises);
});

test("there are six blogs", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, 6);
});

test("all blogs have a unique identifier 'id'", async () => {
  const response = await api.get("/api/blogs");
  const responseIds = response.body.map((blog) => blog.id);
  const expectedIds = blogs.map((blog) => blog._id);

  assert(responseIds.every((id) => expectedIds.includes(id)));
});

test("new blog is added", async () => {
  const newBlog = {
    title: "My Blogs",
    author: "Svante Södergård",
    url: "http://example.com/myblog",
    likes: 221,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 7);

  assert(
    response.body.some(
      (blog) =>
        blog.title === newBlog.title &&
        blog.author === newBlog.author &&
        blog.url === newBlog.url &&
        blog.likes === newBlog.likes,
    ),
  );
});

test("default likes to 0", async () => {
  const newBlog = {
    _id: "8a224cb61ba88676234d17fc",
    title: "My Blogs",
    author: "Svante Södergård",
    url: "http://example.com/myblog",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const responseBlog = response.body.find((blog) => blog.id === newBlog._id);

  assert.strictEqual(responseBlog.likes, 0);
});

test("blog with missing title or url is not added", async () => {
  const missingUrl = {
    title: "My Blogs",
    author: "Svante Södergård",
  };
  const missingTitle = {
    title: "My Blogs",
    author: "Svante Södergård",
  };

  await api.post("/api/blogs").send(missingUrl).expect(400);
  await api.post("/api/blogs").send(missingTitle).expect(400);
});

after(async () => {
  await mongoose.connection.close();
});
