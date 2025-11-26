/* -----------------------------------------------------------
CliqZen Bot - createTask Function (ZCF Node 16)
Safely inserts a task into Catalyst Data Store
----------------------------------------------------------- */

const catalyst = require("zcatalyst-sdk-node");

module.exports = async (context, req, res) => {
try {
const app = catalyst.initialize(context);
const datastore = app.datastore();

// ----------------------------    
// Extract Body    
// ----------------------------    
const { title, priority = "Medium", created_by = "System" } = req.body;    

if (!title || title.trim() === "") {    
  return res.status(400).send({    
    status: "error",    
    message: "Task title is required."    
  });    
}    

// ----------------------------    
// Prepare Row Object    
// ----------------------------    
const row = {    
  title: title,    
  priority: priority,    
  status: "Pending",    
  created_by: created_by,    
  created_at: new Date().toISOString().slice(0, 19).replace("T", " ")    
};    

// ----------------------------    
// Insert into Table    
// ----------------------------    
const table = datastore.table("Tasks");    
await table.insertRow(row);    

return res.status(200).send({    
  status: "success",    
  message: "Task created successfully!",    
  data: row    
});

} catch (err) {
console.error("❌ createTask Error:", err);
return res.status(500).send({
status: "error",
message: "Internal server error."
});
}
};
