/**
 * Test: updateTask Function
 * Ensures tasks are updated correctly in Catalyst Data Store.
 */

const updateTask = require("../functions/updateTask/index.js");

describe("updateTask Function", () => {
  test("should update an existing task", async () => {
    const req = {
      body: {
        title: "Existing Task",
        new_priority: "Low",
        new_status: "In Progress"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateTask({}, req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Task updated successfully",
        updated_task: expect.any(Object)
      })
    );
  });

  test("should fail if task title is missing", async () => {
    const req = { body: {} };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateTask({}, req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
