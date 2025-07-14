# User Guide for DataDolt Application

## Overview
DataDolt is a multi-actor project management application designed to help users manage tasks, meetings, documents, and administrative settings. It supports user authentication, role-based dashboards, and an admin panel for system management.

---

## Getting Started

### Installation and Running
- Run `npm install` to install dependencies.
- Run `npm start` to launch the app in development mode.
- Access the app at [http://localhost:3000](http://localhost:3000).

---

## User Authentication

### Login
- Navigate to the Login page.
- Enter your registered email and password.
- Toggle password visibility if needed.
- On successful login, you will be redirected to your dashboard.
- If login fails, an error message will be displayed.

### Sign Up
- Navigate to the Sign Up page.
- Fill in your email, first name, last name, phone number, password, and confirm password.
- Passwords must match.
- On successful registration, you will be auto-logged in and redirected to the dashboard.
- If registration fails, an error message will be displayed.

---

## User Dashboard

### Overview
- The dashboard displays personalized or global statistics based on your role (coordinator or member).
- Key stats include active tasks, completed tasks, meetings, and documents.
- Visual charts show the distribution of actions and documents.
- Upcoming meetings and high-priority action items are highlighted.

### Navigation
- Use the sidebar to navigate between different sections.
- Access settings via the "Paramètres" button.

---

## Admin Dashboard

### Overview
- The admin dashboard provides management of users, system settings, activity logs, system monitoring, and work groups.
- Sidebar navigation allows switching between sections.
- Logout button clears the admin token and redirects to the admin login page.

### Access Control
- Admin dashboard access requires authentication.
- If not logged in as admin, you will be redirected to the admin login page.

---

## Pages and Features

### Actions Page
- Manage and view action items.
- Filter and prioritize tasks.

### Documents Page
- Access and manage shared documents.

### Meetings Page
- View scheduled meetings.
- See participants and meeting details.

### Settings
- Modify user or system settings.
- Accessible from the dashboard sidebar.

---

## Logging Out
- Use the logout button in the dashboard or admin panel to securely log out.
- This clears your authentication token and redirects to the login page.

---

## Support
For issues or questions, please contact the system administrator or refer to the project documentation.

---

This guide provides a high-level overview of the app's usage and features. For detailed instructions or troubleshooting, please refer to the source code or contact the development team.
