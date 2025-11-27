/**
 * Test: listTasks Function
 * Ensures task retrieval works correctly from Catalyst Data Store.
 */

const listTasks = require("../functions/listTasks/index.js");

describe("listTasks Function", () => {
  test("should return a list of tasks", async () => {
    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await listTasks({}, req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        tasks: expect.any(Array)
      })
    );
  });

  test("should handle empty task list", async () => {
    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await listTasks({}, req, res);

    const response = res.json.mock.calls[0][0];

    expect(response.tasks).toBeDefined();
    expect(Array.isArray(response.tasks)).toBe(true);
  });
});
