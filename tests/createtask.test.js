/**
 * Test: createTask Function
 * Verifies new task creation in Catalyst Data Store.
 */

const request = require("supertest");
const app = require("../functions/createTask/index.js");

describe("createTask Function", () => {
  test("should create a new task successfully", async () => {
    const req = {
      body: {
        title: "Test Task",
        priority: "High",
        created_by: "user@example.com"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await app({}, req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Task created successfully",
        task: expect.any(Object)
      })
    );
  });

  test("should fail when title is missing", async () => {
    const req = { body: {} };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await app({}, req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
