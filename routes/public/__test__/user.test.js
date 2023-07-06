const jwt = require("jsonwebtoken");
const request = require("supertest");
const { app } = require("../../../index.js");

const token = jwt.sign({ id: 2 }, process.env.JWT_SECRET, {
  expiresIn: "1d",
});

jest.mock("../../../services/user.js", () => ({
  getUsers: jest.fn().mockResolvedValue([
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
  ]),
  addUser: jest.fn().mockResolvedValue({
    id: 1,
    name: "Akshay K",
    role: "Sr Dev",
    email: "akshay@gmail.com",
    password: "akshay123",
  }),
  updateUser: jest.fn().mockResolvedValue("User Updated Successfully"),
  removeUser: jest.fn().mockResolvedValue("User Deleted Successfully"),
}));

describe("GET /user", () => {
  it("should return 401 as no auth token in mentioned", async () => {
    const response = await request(app).get("/user");

    expect(response.statusCode).toBe(401);
  });

  it("should return status code 200 and list of users in response body", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      data: [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
      ],
    });
  });
});

describe("POST /create-user", () => {
  it("should respond with status code 200", async () => {
    const response = await request(app).post("/user/create-user").send({
      name: "Akshay K",
      role: "Sr Dev",
      email: "akshay@gmail.com",
      password: "akshay123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      data: {
        id: 1,
        name: "Akshay K",
        role: "Sr Dev",
        email: "akshay@gmail.com",
        password: "akshay123",
      },
    });
  });

  describe("Validation Error", () => {
    describe("if the key is not present", () => {
      it("should respond with status code 422 and if the object is empty in the request body", async () => {
        const response = await request(app).post("/user/create-user").send({});

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"name" is required',
                path: ["name"],
                type: "any.required",
                context: {
                  label: "name",
                  key: "name",
                },
              },
              {
                message: '"role" is required',
                path: ["role"],
                type: "any.required",
                context: {
                  label: "role",
                  key: "role",
                },
              },
              {
                message: '"email" is required',
                path: ["email"],
                type: "any.required",
                context: {
                  label: "email",
                  key: "email",
                },
              },
              {
                message: '"password" is required',
                path: ["password"],
                type: "any.required",
                context: {
                  label: "password",
                  key: "password",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if name is not present", async () => {
        const response = await request(app).post("/user/create-user").send({
          role: "Dev",
          email: "akshay@gmail.com",
          password: "akshay123",
        });

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"name" is required',
                path: ["name"],
                type: "any.required",
                context: {
                  label: "name",
                  key: "name",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if role is not present", async () => {
        const response = await request(app).post("/user/create-user").send({
          name: "Akshay K",
          email: "akshay@gmail.com",
          password: "akshay123",
        });

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"role" is required',
                path: ["role"],
                type: "any.required",
                context: {
                  label: "role",
                  key: "role",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if email is not present", async () => {
        const response = await request(app).post("/user/create-user").send({
          name: "Akshay K",
          role: "Dev",
          password: "akshay123",
        });

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"email" is required',
                path: ["email"],
                type: "any.required",
                context: {
                  label: "email",
                  key: "email",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if password is not present", async () => {
        const response = await request(app).post("/user/create-user").send({
          name: "Akshay K",
          role: "Dev",
          email: "akshay@gmail.com",
        });

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"password" is required',
                path: ["password"],
                type: "any.required",
                context: {
                  label: "password",
                  key: "password",
                },
              },
            ],
          },
        });
      });
    });

    describe("if the value is empty", () => {
      it("should respond with status code 422 if name is provided empty", async () => {
        const response = await request(app).post("/user/create-user").send({
          name: "",
          role: "Dev",
          email: "akshay@gmail.com",
          password: "akshay123",
        });

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"name" is not allowed to be empty',
                path: ["name"],
                type: "string.empty",
                context: {
                  label: "name",
                  key: "name",
                  value: "",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if role is provided empty", async () => {
        const response = await request(app).post("/user/create-user").send({
          name: "Akshay K",
          role: "",
          email: "akshay@gmail.com",
          password: "akshay123",
        });

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"role" is not allowed to be empty',
                path: ["role"],
                type: "string.empty",
                context: {
                  label: "role",
                  key: "role",
                  value: "",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if email is provided empty", async () => {
        const response = await request(app).post("/user/create-user").send({
          name: "Akshay K",
          role: "Dev",
          email: "",
          password: "akshay123",
        });

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"email" is not allowed to be empty',
                path: ["email"],
                type: "string.empty",
                context: {
                  label: "email",
                  key: "email",
                  value: "",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if password is provided empty", async () => {
        const response = await request(app).post("/user/create-user").send({
          name: "Akshay K",
          role: "Dev",
          email: "akshay@gmail.com",
          password: "",
        });

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"password" is not allowed to be empty',
                path: ["password"],
                type: "string.empty",
                context: {
                  label: "password",
                  key: "password",
                  value: "",
                },
              },
            ],
          },
        });
      });
    });
  });
});

describe("PUT /update-user", () => {
  it("should return 401 as no auth token in mentioned", async () => {
    const response = await request(app).put("/user/update-user").send({
      name: "Akshay K",
      role: "Sr Dev",
      email: "akshay@gmail.com",
      password: "akshay123",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ error: "Access Denied" });
  });

  it("should return status code 200 ", async () => {
    const response = await request(app)
      .put("/user/update-user")
      .send({
        id: 6,
        name: "Akshay K",
        role: "Sr Dev",
        email: "akshay@gmail.com",
        password: "akshay123",
      })
      .set("Authorization", token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      data: "User Updated Successfully",
    });
  });

  describe("Validation Error", () => {
    describe("if the key is not present", () => {
      it("should respond with status code 422 and if the object is empty in the request body", async () => {
        const response = await request(app)
          .put("/user/update-user")
          .send({})
          .set("Authorization", token);

        expect(response.statusCode).toBe(422);
      });

      it("should respond with status code 422 if name is not present", async () => {
        const response = await request(app)
          .put("/user/update-user")
          .send({
            id: 6,
            role: "Dev",
            email: "akshay@gmail.com",
            password: "akshay123",
          })
          .set("Authorization", token);

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"name" is required',
                path: ["name"],
                type: "any.required",
                context: {
                  label: "name",
                  key: "name",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if role is not present", async () => {
        const response = await request(app)
          .put("/user/update-user")
          .send({
            id: 6,
            name: "Akshay K",
            email: "akshay@gmail.com",
            password: "akshay123",
          })
          .set("Authorization", token);

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"role" is required',
                path: ["role"],
                type: "any.required",
                context: {
                  label: "role",
                  key: "role",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if email is not present", async () => {
        const response = await request(app)
          .put("/user/update-user")
          .send({
            id: 6,
            name: "Akshay K",
            role: "Dev",
            password: "akshay123",
          })
          .set("Authorization", token);

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"email" is required',
                path: ["email"],
                type: "any.required",
                context: {
                  label: "email",
                  key: "email",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if password is not present", async () => {
        const response = await request(app)
          .put("/user/update-user")
          .send({
            id: 6,
            name: "Akshay K",
            role: "Dev",
            email: "akshay@gmail.com",
          })
          .set("Authorization", token);

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"password" is required',
                path: ["password"],
                type: "any.required",
                context: {
                  label: "password",
                  key: "password",
                },
              },
            ],
          },
        });
      });
    });

    describe("if the value is empty", () => {
      it("should respond with status code 422 if name is provided empty", async () => {
        const response = await request(app)
          .put("/user/update-user")
          .send({
            name: "",
            role: "Dev",
            email: "akshay@gmail.com",
            password: "akshay123",
          })
          .set("Authorization", token);

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"name" is not allowed to be empty',
                path: ["name"],
                type: "string.empty",
                context: {
                  label: "name",
                  key: "name",
                  value: "",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if role is provided empty", async () => {
        const response = await request(app)
          .put("/user/update-user")
          .send({
            name: "Akshay K",
            role: "",
            email: "akshay@gmail.com",
            password: "akshay123",
          })
          .set("Authorization", token);

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"role" is not allowed to be empty',
                path: ["role"],
                type: "string.empty",
                context: {
                  label: "role",
                  key: "role",
                  value: "",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if email is provided empty", async () => {
        const response = await request(app)
          .put("/user/update-user")
          .send({
            name: "Akshay K",
            role: "Dev",
            email: "",
            password: "akshay123",
          })
          .set("Authorization", token);

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"email" is not allowed to be empty',
                path: ["email"],
                type: "string.empty",
                context: {
                  label: "email",
                  key: "email",
                  value: "",
                },
              },
            ],
          },
        });
      });

      it("should respond with status code 422 if password is provided empty", async () => {
        const response = await request(app)
          .put("/user/update-user")
          .send({
            name: "Akshay K",
            role: "Dev",
            email: "akshay@gmail.com",
            password: "",
          })
          .set("Authorization", token);

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual({
          data: {
            type: "Validation Error",
            details: [
              {
                message: '"password" is not allowed to be empty',
                path: ["password"],
                type: "string.empty",
                context: {
                  label: "password",
                  key: "password",
                  value: "",
                },
              },
            ],
          },
        });
      });
    });
  });
});

describe("DELETE /delete-user", () => {
  it("should respond with unauthorised for no auth token", async () => {
    const response = await request(app).delete("/user/delete-user?id=1");

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ error: "Access Denied" });
  });

  it("should respond with 422,if the request query id is not present", async () => {
    const response = await request(app)
      .delete("/user/delete-user")
      .set("Authorization", token);

    expect(response.statusCode).toBe(422);
    expect(response.body.data.type).toEqual("Validation Error");
  });

  it("should respond with 200 for success", async () => {
    const response = await request(app)
      .delete("/user/delete-user")
      .query({ id: 1 })
      .set("Authorization", token);

    expect(response.statusCode).toBe(200);
  });
});
