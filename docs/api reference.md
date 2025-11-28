# 🧩 CliqZen Bot – API Reference

This document provides the complete API reference for all Catalyst Functions used in the CliqZen Bot.  
All functions follow a consistent structure with standardized request/response formats.

---

# 📁 Base Information

### **Base URL**
Each function has a unique Catalyst ZCF endpoint of the form:

> All API calls follow **POST** method unless mentioned.

---

# 1️⃣ createTask  
Creates a new task in the datastore.

### **Endpoint** 
POST /createTask

### **Request Body**
```json
{
  "title": "Buy groceries",
  "priority": "High",
  "created_by": "john.doe"
}

Response

{
  "status": "success",
  "message": "Task created successfully!",
  "data": {
    "title": "Buy groceries",
    "priority": "High",
    "status": "Pending",
    "created_by": "john.doe",
    "created_at": "2025-11-27 10:05:23"
  }
}
2️⃣ updateTask
Endpoint

POST /updateTask

Request Body

{
  "old_title": "Buy groceries",
  "new_title": "Buy items",
  "priority": "Medium",
  "status": "Completed"
}

Response

{
  "status": "success",
  "message": "Task updated successfully.",
  "data": {
    "title": "Buy items",
    "priority": "Medium",
    "status": "Completed"
  }
}
3️⃣ deleteTask

Deletes a task by title.

Endpoint

POST /deleteTask

Request Body

{
  "title": "Buy groceries"
}

Response

{
  "status": "success",
  "message": "Task deleted successfully."
}
4️⃣ listTasks

Returns all tasks in the datastore.

Endpoint

GET /listTasks

Response

{
  "status": "success",
  "tasks": [
    {
      "title": "Buy items",
      "priority": "Medium",
      "status": "Pending",
      "created_by": "john.doe"
    }
  ]
}
5️⃣ getTask

Retrieve a single task by title.

Endpoint

POST /getTask

Request Body

{
  "title": "Buy items"
}

Response

{
  "status": "success",
  "task": {
    "title": "Buy items",
    "priority": "Medium",
    "status": "Pending",
    "created_by": "john.doe",
    "created_at": "2025-11-27 10:05:23"
  }
}
6️⃣ analytics

Generates task statistics and top performers.

Endpoint

GET /analytics

Response

{
  "status": "success",
  "data": {
    "total": 18,
    "completed": 9,
    "pending": 7,
    "overdue": 2,
    "top_performers": [
      "john.doe (5 completed)",
      "jane.p (4 completed)",
      "team.bot (3 completed)"
    ]
  }
}

🔒 Error Format (Universal)

Every function uses a unified error format:

{
  "status": "error",
  "message": "Reason for failure."
}
🏁 Conclusion

This API reference provides everything needed to integrate CliqZen features into:

Custom Cliq menus

Workflows

External applications

Automation scripts

Would you like **next file: `user_guide.md`** or **`architecture.md`**?

