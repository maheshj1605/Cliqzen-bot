/* -----------------------------------------------------------
   CliqZen Bot - updateTask Function (ZCF Node 16)
   Updates an existing task in Catalyst Data Store
----------------------------------------------------------- */

const catalyst = require("zcatalyst-sdk-node");

module.exports = async (context, req, res) => {
  try {
    const app = catalyst.initialize(context);
    const datastore = app.datastore();
    const table = datastore.table("Tasks");

    // ------------------------------------
    // Extract incoming data
    // ------------------------------------
    const { old_title, new_title, priority, status } = req.body || {};

    if (!old_title || old_title.trim() === "") {
      return res.status(400).send({
        status: "error",
        message: "Old task title is required."
      });
    }

    if (!new_title || new_title.trim() === "") {
      return res.status(400).send({
        status: "error",
        message: "New task title cannot be empty."
      });
    }

    const cleanOld = old_title.trim();
    const cleanNew = new_title.trim();

    // ------------------------------------
    // Check if task exists
    // ------------------------------------
    const existing = await table.getPagedRows({
      where: { title: cleanOld }
    });

    if (!existing.data || existing.data.length === 0) {
      return res.status(404).send({
        status: "error",
        message: `Task '${cleanOld}' not found.`
      });
    }

    const taskRow = existing.data[0];

    // ------------------------------------
    // Prevent duplicate new title
    // ------------------------------------
    if (cleanOld !== cleanNew) {
      const dupeCheck = await table.getPagedRows({
        where: { title: cleanNew }
      });

      if (dupeCheck.data.length > 0) {
        return res.status(409).send({
          status: "error",
          message: `Another task with title '${cleanNew}' already exists.`
        });
      }
    }

    // ------------------------------------
    // Build update object
    // ------------------------------------
    const updateData = {};

    // Update only changed fields
    if (cleanOld !== cleanNew) updateData.title = cleanNew;
    if (priority) updateData.priority = priority;
    if (status) updateData.status = status;

    // If nothing to update
    if (Object.keys(updateData).length === 0) {
      return res.status(200).send({
        status: "success",
        message: "No changes detected."
      });
    }

    // ------------------------------------
    // Write updates to Data Store
    // ------------------------------------
    const updated = await table.updateRow(taskRow.ROWID, updateData);

    // ------------------------------------
    // Success response
    // ------------------------------------
    return res.status(200).send({
      status: "success",
      message: "Task updated successfully.",
      updated_task: updated
    });

  } catch (error) {
    console.error("❌ Error in updateTask:", error);

    return res.status(500).send({
      status: "error",
      message: "Internal server error.",
      details: error.message
    });
  }
};
