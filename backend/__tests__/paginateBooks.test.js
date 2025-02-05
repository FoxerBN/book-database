// import request from "supertest";
// import app from "../server.js";
// import mongoose from "mongoose";
// import dotenv from "dotenv"
// dotenv.config()
// beforeAll(async () => {
//   const dbUri = process.env.MONGODB_URI
//   await mongoose.connect(dbUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe("GET /api/books/paginate", () => {
//   test("should return paginated books with default sorting by year ASC", async () => {
//     const response = await request(app).get("/api/books/paginate?page=1");
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("books");
//     expect(Array.isArray(response.body.books)).toBe(true);
//   });

//   test("should sort books by author DESC", async () => {
//     const response = await request(app).get("/api/books/paginate?sortBy=author&order=desc");
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("books");
//     expect(Array.isArray(response.body.books)).toBe(true);
//   });

//   test("should sort books by pages ASC", async () => {
//     const response = await request(app).get("/api/books/paginate?sortBy=pages&order=asc");
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("books");
//     expect(Array.isArray(response.body.books)).toBe(true);
//   });

//   test("should default to year sorting if invalid sort field is provided", async () => {
//     const response = await request(app).get("/api/books/paginate?sortBy=invalidField");
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("books");
//     expect(Array.isArray(response.body.books)).toBe(true);
//   });

//   test("should return an empty array if page number exceeds total pages", async () => {
//     const response = await request(app).get("/api/books/paginate?page=999");
//     expect(response.status).toBe(200);
//     expect(response.body.books).toEqual([]);
//   });
// });
