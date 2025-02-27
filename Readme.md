# User Registration and Login API

A Node.js application for user registration and login, built with **Express.js**, **MongoDB**, **Joi**, and **JWT**.

---

## Features

- User registration and login.
- Input validation using Joi.
- Password hashing with Bcrypt.
- JWT-based authentication.
- Unit tests with Jest.
- Docker support.

---


## API Endpoints
**Base URL:** `http://127.0.0.1:8888/nwt/app/api/v1/users`
---
### 1. Register a User

* **URL:** `/register`
* **Method:** `POST`
* **Request Body :**
```json 
    {
    "name": "Abc Def",
    "email": "abc@gmail.com",
    "password": "password123",
    "worth": 5000
    }
```
---
### 2. Login a User

* **URL:** `/login`
* **Method:** `POST`
* **Request Body :**
```json
    {
    "email": "abc@gmail.com",
    "password": "password123"
    }
```
---