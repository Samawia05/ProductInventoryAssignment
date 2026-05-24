# Product Inventory Manager

A full-stack web application built to manage a product inventory database. This project connects a responsive frontend user interface to an ASP.NET Core REST API backend, performing full CRUD operations with a live local MongoDB database server.

##  Features Implemented
* **View Records (GET):** Dynamically loads and displays current inventory items in a clean table dashboard view.
* **Add Record (POST):** Modal form interface to insert new entries smoothly into the database without reloading the page.
* **Update Record (PUT):** Pre-fills existing data fields dynamically into the form layer to handle quick edits.
* **Delete Record (DELETE):** Quick-action button triggers to safely drop specified items out of the database entries.
* **Data Validation:** Strict frontend checks block empty submissions, missing string categories, negative numbers, or invalid entries.

##  Tech Stack
* **Frontend:** HTML5, CSS3, JavaScript (ES6 Fetch API)
* **Backend:** ASP.NET Core Web API (.NET 10)
* **Database:** MongoDB Server

##  Local Setup Instructions

### 1. Initialize the Database Server
Make sure the local database engine is active on your Windows machine:
1. Press `Win + R`, type `services.msc`, and press **Enter**.
2. Locate **MongoDB Server (MongoDB)** in the list.
3. Verify its status shows **Running** (If stopped, right-click and select **Start**).

### 2. Launch the Backend API Server
Open your system terminal window inside the server project root directory (`ProductInventoryManager`) and run:
```bash
<img width="958" height="461" alt="image" src="https://github.com/user-attachments/assets/ed3cb1e4-776f-413e-9bed-63cb7889a739" />
