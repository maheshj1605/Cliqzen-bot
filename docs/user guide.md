# 🤖 CliqZen Bot – User Guide
Welcome to **CliqZen**, your smart AI-powered task assistant integrated with **Zoho Cliq** and **Catalyst**.  
This guide explains how to use every feature from creating tasks to viewing analytics.

---

# 🌟 1. Introduction

CliqZen helps you:
- Create, update, and delete tasks easily  
- View organized task lists  
- Track productivity analytics  
- Receive reminders and overdue alerts  
- Use interactive cards & menus inside Zoho Cliq  

Everything works automatically using Catalyst functions and Cliq messages.

---

# 🧭 2. Getting Started

### **How to open the bot**
1. Open **Zoho Cliq**
2. Go to **Bots**
3. Search **“CliqZen Bot”**
4. Click **Start Conversation**

---

# 📝 3. Creating Tasks

### **Command Format**
### **Command Format**

/task create <title> [priority]

### **Examples**

/task create Buy groceries High /task create Prepare meeting slides Medium

### **What happens**
- Bot stores the task
- Shows a confirmation message
- Displays a task card with priority, status, and timestamps

---

# ✏️ 4. Editing Tasks

### **Command Format**

/task update <old_title> -> <new_title> [priority] [status]

### **Examples**

/task update Buy groceries -> Buy items Medium Completed

### **Using Edit Button**
You can also edit directly using:
- Task List card  
- Task Details card  

⚙️ Both trigger the `updateTask` function.

---

# ❌ 5. Deleting Tasks

### **Command Format**

/task delete <title>

### **Example**

/task delete Buy items

### **Using Delete Button**
On task cards:
- Click **🗑️ Delete**
- Confirm delete action

---

# 📋 6. Viewing All Tasks

### **Command**

/task list

### **Bot Shows**
- A beautiful task list UI  
- Priority & status displayed clearly  
- Buttons for editing & deleting  

---

# 🔍 7. Viewing a Single Task

### **Command**

/task get <title>

### **Bot Shows**
A detailed card:
- Title  
- Priority  
- Status  
- Created By  
- Created At  

---

# 📊 8. Task Analytics Dashboard

### **Command**

/task analytics

### **Dashboard Shows**
- Total Tasks  
- Completed  
- Pending  
- Overdue  
- Top Performers  

All inside a modern analytic card UI.

---

# ⏰ 9. Reminders & Automation

CliqZen includes 3 background workflows:

### **1. Daily Summary**
Sends a list of:
- Tasks completed today  
- Pending tasks  
- Overdue tasks  

### **2. Reminder Scheduler**
Reminds users about:
- Tasks due today  
- Upcoming deadlines  

### **3. Overdue Task Checker**
Automatically:
- Marks tasks as **Overdue**
- Sends alert messages

---

# ⚙️ 10. Supported Priorities
- **High**
- **Medium**
- **Low**

Default = Medium

---

# 🗂️ 11. Task Fields (For Reference)

| Field        | Description |
|--------------|-------------|
| title        | Name of task |
| priority     | High / Medium / Low |
| status       | Pending / Completed / Overdue |
| created_by   | User who added the task |
| created_at   | Timestamp |
| due_date     | Optional deadline |

---

# 🆘 12. Help Command

/task help

Shows:
- Available commands  
- Button menus  
- Quick actions  

---

# 🏁 13. Conclusion

You are now ready to use **CliqZen Bot** to boost your productivity, automate reminders, and manage tasks effortlessly.

For developers, check:
- **api_reference.md**
- **architecture.md**

