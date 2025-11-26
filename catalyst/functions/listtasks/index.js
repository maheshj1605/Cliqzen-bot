/* -----------------------------------------------------------
   CliqZen Bot - listTasks Function (ZCF Node 16)
   Returns all tasks stored in Catalyst Data Store
----------------------------------------------------------- */

const catalyst = require("zcatalyst-sdk-node");

module.exports = async (context, req, res) => {
  try {
    const app = catalyst.initialize(context);
    const datastore = app.datastore();
    const table = datastore.table("Tasks");

    // Optional filter by created_by
    const { created_by } = req.query || {};

    let query = {};
    if (created_by) {
      query = { where: { created_by: created_by } };
    }

    // Fetch tasks
    const result = await table.getPagedRows(query);

    const tasks = result.data || [];

    return res.status(200).send({
      status: "success",
      count: tasks.length,
      tasks: tasks
    });

  } catch (err) {
    console.error("❌ listTasks Error:", err);
    return res.status(500).send({
      status: "error",
      message: "Internal server error while listing tasks."
    });
  }
};
