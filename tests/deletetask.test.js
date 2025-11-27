/**
 * Test: deleteTask Function
 * Ensures tasks are safely deleted from Catalyst Data Store.
 */

const deleteTask = require("../functions/deleteTask/index.js");

describe("deleteTask Function", () => {
  test("should delete a task successfully", async () => {
    const req = {
      body: {
        title: "Sample Task"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await deleteTask({}, req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Task deleted successfully"
      })
    );
  });

  test("should return error when title is missing", async () => {
    const req = { body: {} };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await deleteTask({}, req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Task title is required"
      })
    );
  });
});
