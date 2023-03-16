#  Description:-
## ProjectPulse is a project tracking tool for organizations where any organization can track of their projects.
How to Install the project
Download the git repository manually or clone it by following command
```
git clone
```
If you download manually extract the zip file.
Then run the following command to install all the modules that are used in this project
```
 npm install
```
Then start the server using below command
```
  npm start
```
## Configurations
Create .env folder and add the following details to the .env file
```
DB_NAME = YOUR_DB_NAME (Add your details)
DB_USER = YOUR_DB_USER
DB_PASSWORD = YOUR_DB_PASSWORD
PORT = PORT
SECRET_KEY = secret
```
## Create database named project_pulse
We assume that employee table is existing in a database so create table employee(attributes:{emp_email}) and insert data into table
Overview

## Roles in this project:-
```
1.SuperAdmin
2.Admin
3.GDO (Global Delivery Organization)
4.Project Manager
5.User
```
## Tasks executed by the roles
### SuperAdmin
```
 1.Super Admin Login
 2.View all the users
 3.Assign a role to the users
 4.View the projects
 5.Update the password of the users
```
### Admin
```
 1. Create a Project
 2. Can access all project details
 3. Can access all project Concerns
 4. Can access all project Updates
 5. Can access all project resources 
```
GDO (Global Delivery Organization)
```
 1.Add the Project Team Members
 2.Get the Portfolio Dashboard
 3.Get all the Specific project Details of a project
```
Project Manager
```
 1.Adding project updates
 2.Adding project concerns
 3.Get all the specific projects under his maintainance
 4.Get specific project details (Detailed overview,project concerns, project updates team Composition)
 5.Update the Project concerns
 6.Update the Project updates
 
 ```
