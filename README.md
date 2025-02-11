# 🚀 Plugins Integration Project with Angular & NestJS API

## 📄Description
The goal of this sprint is to explore and integrate various plugins often required by clients in professional projects. In this project, you'll build a full-stack application with an Angular frontend and a NestJS API backend using MongoDB for data storage. The application integrates plugins for managing calendar events and displaying dynamic charts, providing you with a platform to showcase advanced functionalities. This project is an excellent addition to your portfolio and a great talking point in job interviews.

## Project Objectives
- **Plugin Integration:** Work with popular plugins commonly needed in web projects.
- **API Development:** Create a RESTful API using NestJS that connects to MongoDB to handle data persistence.
- **CRUD Implementation:** Develop a CRUD application in Angular that interacts with the API.
- **Data Management:** Implement functionalities for:
  - **Calendar:** Manage events using a calendar plugin (e.g., FullCalendar).
  - **Charts:** Display dynamic data using Chartjs for various types of charts (e.g., bar and line charts).

## 📋 Exercise Levels

### Level 1
- **Exercise 1:**  
  Create an Angular project with a top navigation menu that includes the following links:
  - Home
  - Calendar
  - Charts  
  Set up the corresponding components and configure routing accordingly.

| ![image](https://github.com/user-attachments/assets/1de2b83f-63ef-4f28-a0cf-528822e85cde) | ![image](https://github.com/user-attachments/assets/921335db-d8e7-484f-8fff-a689c05f3894) | ![image](https://github.com/user-attachments/assets/a91e8cd2-6765-467e-a5cf-b064fda6a2f0) |
| --- | --- | --- |



- **Exercise 2:**  
  Develop a RESTful API using NestJS and MongoDB. Implement CRUD operations for a chosen data entity (e.g., user management or event management).

- **Exercise 3:**  
  Integrate the following plugins:
  - **FullCalendar:** Allow users to add and remove events.
  - **Chartjs:** Render at least two types of charts (e.g., a bar chart and a line chart) based on the stored data.
 
| ![image](https://github.com/user-attachments/assets/d4cde270-8dbc-4903-9acc-325ed5e280d9) | <img src="https://github.com/user-attachments/assets/bb2819c4-6719-4e7a-a961-149c580f9308" alt="image" width="600"> |
| --- | --- |

 

### Level 2
- **Exercise 4:**  
  Enhance the map functionality by introducing additional features such as filtering events by category. This filter can be implemented as a dropdown or a list of checkboxes.
![image](https://github.com/user-attachments/assets/798cbf85-81a1-4483-a716-f7ff2fb16b62)

### Level 3
- **Exercise 5:**
  Enable editing of calendar events via a modal dialog. Ensure that the updated event data is sent to the API to update the database accordingly.

<img src="https://github.com/user-attachments/assets/3a42b7e8-723a-4d74-93e3-eb21d455c856" alt="image" width="600">

## 🚀 Technologies Used
- **Angular:** Frontend development, components, and routing.
- **NestJS:** Backend API development.
- **MongoDB:** Database for data storage.
- **FullCalendar:** Calendar event management.
- **Chartjs:** Dynamic chart rendering.
- **TypeScript:** For both frontend and backend for strong typing.
- **SASS/SCSS:** For styling and responsive design.

## 📋Requirements
- NestJS
- npm or yarn
- Angular CLI
- MongoDB

## 🌐 Deployment & Installation

Installation and Setup:
1. **Angular Application:**
   - Navigate to your project directory:
     cd project-directory
   - Install dependencies:
     npm install
   - Run the Angular application:
     ng serve -o

2. **NestJS API with MongoDB:**
   - Navigate to the API folder:
     cd api
   - Install dependencies:
     npm install
   - Start the NestJS API server:
     npm run start:dev
   (The API will be available at http://localhost:3000/api or your configured port.)

## ⚙️ Testing & Validation
Key Test Cases:
- **API Integration:**
  - Validate that the CRUD operations (create, read, update, delete) work correctly.
- **Plugin Functionality:**
  - Ensure that the calendar allows adding, deleting, and editing events.
  - Verify that the charts display data accurately.
- **Responsive UI:**
  - Test the application layout on various devices.
- **Unit Testing:**
  - Implement tests for key Angular components and NestJS API endpoints.

## 💬Final Notes
- **Be Creative:** This project is an excellent opportunity to showcase your ability to integrate multiple functionalities and develop complex features.
- **Professional Portfolio:** Use this project to demonstrate your skills to potential employers.
- **Enjoy the process and happy coding!** 🚀✨
