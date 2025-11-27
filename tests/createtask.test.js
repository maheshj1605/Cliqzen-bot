/**
 * -------------------------------------------------------------
 * Test Suite: createTask Function
 * Platform   : Zoho Catalyst (ZCF - Node 16)
 * Project    : CliqTrIx - Smart Task Manager
 * -------------------------------------------------------------
 */

const request = require("supertest");
const catalyst = require("zcatalyst-sdk-node");

jest.mock("zcatalyst-sdk-node");

describe("createTask Function", () => {
    let mockApp, mockDatastore, mockTable;

    beforeEach(() => {
        mockTable = {
            insertRow: jest.fn().mockResolvedValue({
                ROWID: 12345,
                title: "Demo Task"
            })
        };

        mockDatastore = {
            table: jest.fn().mockReturnValue(mockTable)
        };

        mockApp = {
            datastore: () => mockDatastore
        };

        catalyst.initialize.mockReturnValue(mockApp);
    });

    test("should create a new task successfully", async () => {
        const req = {
            body: {
                title: "Demo Task",
                priority: "High",
                created_by: "user123"
            }
        };

        // Mock Express res
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const createTask = require("../functions/createTask/index.js");
        await createTask({}, req, res);

        expect(mockTable.insertRow).toHaveBeenCalledWith(expect.objectContaining({
            title: "Demo Task",
            priority: "High",
            created_by: "user123"
        }));

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
            status: "success",
            message: "Task created successfully"
        }));
    });

    test("should return 400 if title is missing", async () => {
        const req = { body: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const createTask = require("../functions/createTask/index.js");
        await createTask({}, req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
            status: "error",
            message: "Task title is required"
        }));
    });
});
