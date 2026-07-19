#  SpendWise – Expense Tracker

SpendWise is a full-stack MERN Expense Tracker that helps users manage their daily expenses, monitor budgets, and visualize spending through interactive analytics. It provides secure authentication, profile management, budget tracking, report generation, and a responsive modern UI with Dark Mode support.

##  Live Demo

Frontend: https://spendwise-expense-tracker-wine.vercel.app/

Backend API: https://spendwise-expense-tracker-mqvg.onrender.com/

---

## Features

- JWT Authentication (Login & Register)
-  Forgot Password using Email
-  Profile Management
-  Add, Edit & Delete Expenses
-  Interactive Expense Analytics
-  Budget Tracking
-  CSV Report Export
-  Dark / Light Theme
-  Responsive User Interface

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router
- Recharts
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- Nodemailer
- Bcrypt.js

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)

## Project Structure
Expense_Tracker
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md

##  Installation

### Clone Repository

```bash
git clone https://github.com/Dharni-Mayekar/Expense_Tracker.git
```

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

##  Environment Variables

Create a `.env` file inside the **server** folder.

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password

## Screenshots

Add screenshots here after uploading them.

Example:

- Login Page
- Dashboard
- Analytics
- Reports
- Dark Mode

---

##  Author
**Dharni Mayekar**
GitHub: https://github.com/Dharni-Mayekar