const request = require("supertest");
const { app } = require("../../../index.js");

describe("User Routes", () => {
  test("get users", async () => {
    const response = await request(app).get("/user");
    expect(response.statusCode).toBe(500);
  });
});
