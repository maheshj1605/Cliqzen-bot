/* -----------------------------------------------------------
   CliqZen Bot - analytics Function (ZCF Node 16)
   Generates task analytics summary for dashboard view
----------------------------------------------------------- */

const catalyst = require("zcatalyst-sdk-node");

module.exports = async (context, req, res) => {
  try {
    const app = catalyst.initialize(context);
    const datastore = app.datastore();
    const table = datastore.table("Tasks");

    // ---------------------------------------
    // Fetch All Tasks
    // ---------------------------------------
    const query = await table.getPagedRows({});
    const tasks = query.data || [];

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Completed").length;
    const pending = tasks.filter(t => t.status !== "Completed").length;

    // ---------------------------------------
    // Compute Top Performers
    // Based on "completed tasks count by user"
    // ---------------------------------------
    const userMap = {};

    tasks.forEach(t => {
      const user = t.created_by || "Unknown";

      if (!userMap[user]) userMap[user] = { completed: 0 };
      if (t.status === "Completed") userMap[user].completed++;
    });

    // Convert to sorted array
    const sortedUsers = Object.keys(userMap)
      .map(u => ({ user: u, completed: userMap[u].completed }))
      .sort((a, b) => b.completed - a.completed)
      .slice(0, 3);

    const top_user_1 = sortedUsers[0]?.user || "N/A";
    const top_user_2 = sortedUsers[1]?.user || "N/A";
    const top_user_3 = sortedUsers[2]?.user || "N/A";

    return res.status(200).send({
      status: "success",
      analytics: {
        total,
        completed,
        pending,
        top_user_1,
        top_user_2,
        top_user_3
      }
    });

  } catch (err) {
    console.error("❌ analytics Error:", err);
    return res.status(500).send({
      status: "error",
      message: "Internal server error while calculating analytics."
    });
  }
};
        
