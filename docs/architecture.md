## 🏗️ CliqZen Bot – System Architecture

This document describes the foundational architecture of the **CliqZen Task Manager Bot**, built using **Zoho Catalyst** and **Zoho Cliq** to provide a fast, scalable, and interactive task-management experience for teams.



## 1. 🔹 System Overview

CliqZen enables users to:

- Create, update, delete, and list tasks  
- View productivity analytics  
- Receive automated reminders and overdue alerts  

It integrates **Zoho Cliq** (front-end UI) with **Zoho Catalyst** (backend logic + datastore), supported by scheduled workflows and reusable UI templates.

## 2. 🔹 Architecture Layers
                  ┌──────────────────────────────────────────────┐
│                 Zoho Cliq UI                 │
│      (Cards • Lists • Buttons • Commands)    │
└──────────────────────────────────────────────┘
                     ⇅
┌──────────────────────────────────────────────┐
│           Catalyst Functions (ZCF)           │
│ createTask • updateTask • deleteTask         │
│ listTasks  • analytics                       │
└──────────────────────────────────────────────┘
                     ⇅
┌──────────────────────────────────────────────┐
│             Catalyst Data Store              │
│                (Tasks Table)                 │
└──────────────────────────────────────────────┘
                     ⇅
┌──────────────────────────────────────────────┐
│         Scheduled Workflows (Deluge)         │
│ daily_summary • reminders • overdue_checker  │
└──────────────────────────────────────────────┘
   
  

## 3. 🔹 Component Details

### **A. Catalyst Functions**
Each function is isolated, scalable, and handles one responsibility:

| Function        | Purpose                                   |
|------------------|-------------------------------------------|
| `createTask`     | Create a new task                         |
| `updateTask`     | Modify title, priority, or status         |
| `deleteTask`     | Remove a task securely                    |
| `listTasks`      | Fetch user or team tasks                  |
| `analytics`      | Generate productivity summaries           |

All functions:  
- Validate input  
- Read/write to **Tasks** table  
- Return interactive **Cliq cards**

---

### **B. Data Store (Tasks Table)**

| Column       | Type      | Description                            |
|--------------|-----------|----------------------------------------|
| id           | bigint    | Auto-increment primary key            |
| title        | string    | Task name                             |
| priority     | string    | Low / Medium / High                   |
| status       | string    | Pending / Completed / Overdue         |
| created_by   | string    | Zoho User ID                          |
| created_at   | datetime  | Auto-generated timestamp              |
| due_date     | date      | Optional deadline                     |

Well-indexed for fast queries:
- Index on `created_by`
- Index on `status`

---

### **C. Workflows (Schedules)**  
Workflows automate background processing:

| Workflow Name            | Purpose                                     |
|---------------------------|---------------------------------------------|
| `daily_summary.deluge`    | Sends each user a daily task summary        |
| `reminder_scheduler`      | Alerts users 24h before due date            |
| `overdue_task_checker`    | Marks expired tasks as **Overdue**          |

These run independently of user activity.

---

### **D. UI Templates**

Reusable JSON templates ensure consistent UI across Cliq:

- **task_card_template.json** → Detailed task view  
- **task_list_template.json** → Scrollable task listing  
- **analytics_template.json** → Dashboard-style summary  

Templates reduce code duplication and simplify function responses.

---

### **E. Tests**

Unit tests written with **Jest**, covering:

- Task creation  
- Update workflow  
- Deletion rules  
- Data fetch accuracy  
- Analytics correctness  

Ensures reliability before deployment.

---

## 4. 🔹 Data Flow Summary

### **Step-by-step lifecycle**

1. **User triggers a command** in Cliq (e.g., `/addtask`).  
2. **Catalyst function executes**, validating the request.  
3. **Database is updated** (insert/update/delete).  
4. Function returns a **dynamic card/response** to Cliq.  
5. **Workflows run independently** to maintain task health:  
   - Daily summaries  
   - Reminders  
   - Overdue tagging  

---

## 5. 🔹 Security Considerations

- Controlled access via **secure APIs**  
- Input sanitization in all functions  
- Prevention of unauthorized task editing  
- Error handling and rollback on failures  
- No duplicate task creation for a user  

---

## 6. 🔹 Deployment Steps

1. Deploy **functions** from Catalyst console  
2. Create **Tasks** table using schema.json  
3. Upload **UI templates**  
4. Configure **Cliq Bot** and map commands  
5. Enable **workflows**  
6. Perform test execution  
7. Go live 🎉  

---

## 7. 🔹 Scalability & Performance

- Stateless functions auto-scale  
- Datastore optimized with indexes  
- Templates reduce response size  
- Workflows offload background operations  
- Supports large teams and high task volume  

---

## 8. 🔹 Future Enhancements

- AI-based task suggestions  
- Natural-language task creation  
- Multi-project support  
- Attachments and file support  
- Team-wide performance heatmaps  

---

*Clean. Extensible. Production-grade architecture.*
