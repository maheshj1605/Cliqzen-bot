/**
 * Test: analytics Function
 * Verifies analytics summary calculations.
 */

const analytics = require("../functions/analytics/index.js");

describe("analytics Function", () => {
  test("should return valid analytics summary", async () => {
    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await analytics({}, req, res);

    // Validate structure
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        total: expect.any(Number),
        completed: expect.any(Number),
        pending: expect.any(Number),
        overdue: expect.any(Number),
        top_performers: expect.any(Array)
      })
    );
  });

  test("should not crash when no tasks exist", async () => {
    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await analytics({}, req, res);

    const result = res.json.mock.calls[0][0];

    expect(result.total).toBeGreaterThanOrEqual(0);
    expect(result.completed).toBeGreaterThanOrEqual(0);
    expect(result.pending).toBeGreaterThanOrEqual(0);
    expect(result.overdue).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(result.top_performers)).toBe(true);
  });
});
