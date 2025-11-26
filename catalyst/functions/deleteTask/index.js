/* -----------------------------------------------------------
   CliqZen Bot - deleteTask Function (ZCF Node 16)
   Deletes a task from Catalyst Data Store safely by Title
----------------------------------------------------------- */

const catalyst = require("zcatalyst-sdk-node");

module.exports = async (context, req, res) => {
  try {
    const app = catalyst.initialize(context);
    const datastore = app.datastore();
    const table = datastore.table("Tasks");

    // -----------------------------------------
    // Extract & validate title
    // -----------------------------------------
    const { title } = req.body || {};

    if (!title || title.trim() === "") {
      return res.status(400).send({
        status: "error",
        message: "Task title is required to delete."
      });
    }

    const cleanTitle = title.trim();

    // -----------------------------------------
    // Fetch matching task (case-insensitive)
    // Catalyst workaround: use 'search' instead of exact match
    // -----------------------------------------
    const result = await table.getPagedRows({
      search: cleanTitle
    });

    if (!result.data || result.data.length === 0) {
      return res.status(404).send({
        status: "error",
        message: `Task '${cleanTitle}' not found.`
      });
    }

    // Ensure exact title match
    const exactMatch = result.data.find(
      (t) => t.title.toLowerCase() === cleanTitle.toLowerCase()
    );

    if (!exactMatch) {
      return res.status(404).send({
        status: "error",
        message: `Task '${cleanTitle}' not found.`
      });
    }

    const taskId = exactMatch.ROWID;

    // -----------------------------------------
    // Delete task
    // -----------------------------------------
    await table.deleteRow(taskId);

    return res.status(200).send({
      status: "success",
      message: `Task '${cleanTitle}' deleted successfully.`,
      deleted_row_id: taskId
    });

  } catch (err) {
    console.error("❌ deleteTask Error:", err);

    return res.status(500).send({
      status: "error",
      message: "Internal server error.",
      error: err.message
    });
  }
};
