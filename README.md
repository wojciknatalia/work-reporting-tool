
# work-reporting-tool

## About
Work Reporting Tool is Dockerized Django Back-end API with Angular Front-end. It is used to manage timesheets. Work Reporting Tool allows users to add, edit and delete user tasks. User data is safe thanks to authentication and authorization mechanisms.

**v1.0.0 - 26.01.2021**

 - Register and Login using JWT auth,
 - Basic API with Django REST Framework,
 - Angular App connected to REST API,
 - Lightweight and efficient Docker image


## Table of Contents

1. [About](#About)
2. [Getting Setup](#Getting-Setup)
  2.1. [Prerequisites](#Prerequisites)
  2.2. [Installation](#Installation)
4. [Architecture](#Architecture)
  3.1. [Base URL](#Base-URL)
  3.2. [Authorization overview](#Authorization-overview)
  3.3. [Endpoints list](#Endpoints-list)

## Getting Setup
### Prerequisites
Complete all Work-Reporting-Tool dependencies.
- Django (*[download](https://www.djangoproject.com/download/)*)
- Visual Studio Code (*[download](https://code.visualstudio.com/)*)
- Docker (*[download](https://docs.docker.com/docker-for-windows/install/)*)
- Node (*[download](https://nodejs.org/en/download/)*)
- Angular-cli (*[download](https://cli.angular.io/)*)

### Installation
Navigate to where you want your project to be contained.
````
git clone https://github.com/wojciknatalia/work-reporting-tool.git
````
Open cmd in clonned repository and type:
````
docker-compose up
````
Open second cmd in clonned repository, leaving the previous one running and type:
````
cd work-reporting-frontend/angular-app
ng serve
````
Navigate to localhost:4200 to see a running application.
## Architecture

### Base URL
Staging endpoint: ``` localhost:8000 ```

### Authorization overview
Authorization is based on JWT tokens. To log in you need to provide user credentials with proper email and password. In response Authorization headers you will receive valid JWT which now can be include into next request headers. If an endpoint requires authentication add header:
``` Authorization: JWT your-jwt-token ```

### Endpoints list

#### Task
**URI:** /api/tasks  
**METHOD:** GET  
**RESPONSE:** 
STATUS: 200 
```
[
    {
        "id": 1,
        "title": "task1",
        "date": "2021-01-25",
        "hours": "1.00",
        "employee_email": "admin1@gmail.com",
        "employee": 3
    },
    {
        "id": 2,
        "title": "task2",
        "date": "2021-01-25",
        "hours": "2.00",
        "employee_email": "admin1@gmail.com",
        "employee": 3
    }
]
```
---
**URI:** /api/tasks  
**METHOD:** POST  
**BODY:**  
```
{
    "task": {
        "title": "a",
        "hours": 1,
        "employee_email": "admin1@gmail.com",
        "action": "Add new task"
    },
    "email": "admin1@gmail.com"
}
```
**RESPONSE:** 
STATUS: 201 
```
{
    "id": 7,
    "title": "a",
    "date": "2021-01-27",
    "hours": "1.00",
    "employee_email": "admin1@gmail.com",
    "employee": 3
}

```
---
**URI:** /api/tasks/:id 
**METHOD:** DELETE  
**RESPONSE:** 
STATUS: 204
NO CONTENT

---
**URI:** /api/tasks/:id  
**METHOD:** PUT  
**BODY:**  
```
{
    "id": 2,
    "title": "task2",
    "date": "2021-01-25",
    "hours": 3,
    "employee_email": "admin1@gmail.com",
    "employee": 3,
    "action": "Edit"
}
```
**RESPONSE:** 
STATUS: 201 
```
{
    "id": 2,
    "title": "task2",
    "date": "2021-01-25",
    "hours": "3.00",
    "employee_email": "admin1@gmail.com",
    "employee": 3
}
```

#### Signup
**URI:** /auth/signup/  
**METHOD:** POST  
**BODY:**
```
{
    "username": "user123",
    "email": "user123@example.com",
    "password1": "tteesstt",
    "password2": "tteesstt"
}
```
**RESPONSE:** 
STATUS: 201
```
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6InVzZXIxMjM0IiwiZXhwIjoxNjExOTQ4OTQ2LCJlbWFpbCI6InVzZXIxMjM0QGV4YW1wbGUuY29tIiwib3JpZ19pYXQiOjE2MTE3NzYxNDZ9.QI4yo4fPykpz78QNnTACm7NMYhu8ZgD7sUBBc2qgV24",
    "user": {
        "pk": 5,
        "username": "user1234",
        "email": "user1234@example.com",
        "first_name": "",
        "last_name": ""
    }
}
```

Status: 400
```
{
    "username": [
        "A user with that username already exists."
    ],
    "email": [
        "A user is already registered with this e-mail address."
    ],
    "password1": [
        "This password is too short. It must contain at least 8 characters.",
        "This password is too common."
    ]
}
```

#### Login
**URI:** /auth/login/  
**METHOD:** POST  
**BODY:**
```
{
    "username": "user123",
    "password": "tteesstt"
}
```
**RESPONSE:** 
STATUS: 200
```
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6InVzZXIxMjM0IiwiZXhwIjoxNjExOTQ5MDY5LCJlbWFpbCI6InVzZXIxMjM0QGV4YW1wbGUuY29tIiwib3JpZ19pYXQiOjE2MTE3NzYyNjl9.z0t-02X03FSU6SX6LbFo3QficNkClEQpzlaFj0GuI-4",
    "user": {
        "pk": 5,
        "username": "user1234",
        "email": "user1234@example.com",
        "first_name": "",
        "last_name": ""
    }

}
```

Status: 400
```
{
    "global": [
        "Unable to log in with provided credentials."
    ]
}
```

#### Refresh token
**URI:** /auth/refresh-token/  
**METHOD:** POST  
**BODY:**
```
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6InVzZXIxMjM0IiwiZXhwIjoxNjExOTQ5MDY5LCJlbWFpbCI6InVzZXIxMjM0QGV4YW1wbGUuY29tIiwib3JpZ19pYXQiOjE2MTE3NzYyNjl9.z0t-02X03FSU6SX6LbFo3QficNkClEQpzlaFj0GuI-4"
}
```
**RESPONSE:** 
STATUS: 200
```
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6InVzZXIxMjM0IiwiZXhwIjoxNjExOTQ5MDY5LCJlbWFpbCI6InVzZXIxMjM0QGV4YW1wbGUuY29tIiwib3JpZ19pYXQiOjE2MTE3NzYyNjl9.z0t-02X03FSU6SX6LbFo3QficNkClEQpzlaFj0GuI-4"
}
```
Status: 400
```
{
    "global": [
        "Error decoding signature."
    ]
}
```

