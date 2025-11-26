
/* -----------------------------------------------------------
   CliqZen Bot - getTask Function (ZCF Node 16)
   Fetches a task using its title from Catalyst Data Store
----------------------------------------------------------- */

const catalyst = require("zcatalyst-sdk-node");

module.exports = async (context, req, res) => {
  try {
    const app = catalyst.initialize(context);
    const datastore = app.datastore();
    const table = datastore.table("Tasks");

    const { title } = req.query || {};

    if (!title || title.trim() === "") {
      return res.status(400).send({
        status: "error",
        message: "Task title is required."
      });
    }

    const cleanTitle = title.trim();

    const result = await table.getPagedRows({
      where: { title: cleanTitle }
    });

    if (!result.data || result.data.length === 0) {
      return res.status(404).send({
        status: "error",
        message: `Task '${cleanTitle}' not found.`
      });
    }

    return res.status(200).send({
      status: "success",
      task: result.data[0]
    });

  } catch (err) {
    console.error("❌ getTask Error:", err);
    return res.status(500).send({
      status: "error",
      message: "Internal server error while fetching task."
    });
  }
};
