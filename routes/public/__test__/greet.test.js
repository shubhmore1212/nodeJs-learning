const request = require("supertest");
const { app } = require("../../../index.js");

describe("Greet Router", () => {
  test("It should return 200 response", async () => {
    const response = await request(app).get("/greet");
    expect(response.statusCode).toBe(200);
  });
});
