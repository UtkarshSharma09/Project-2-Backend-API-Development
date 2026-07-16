# Project-2-Backend-API-Development

## Overview
This repository contains the backend integration phase for DecodeLabs Project 2[cite: 1]. It serves as the RESTful "nervous system"[cite: 1] for the ZenTax website—a gamified financial tracking platform designed specifically for the GenZ demographic. This API bridges the gap between frontend user interaction and server-side processing to power the application with absolute reliability[cite: 1]. 

## Core Architecture
* **Statelessness:** Engineered to handle requests independently, ensuring high availability and system resilience[cite: 1].
* **The Gatekeeper Rule:** Implements strict two-layer data validation (Syntactic format checking and Semantic logic verification) because we "Never Trust the Client"[cite: 1].
* **Semantic Communication:** Utilizes precise HTTP status codes (`201 Created`, `400 Bad Request`, `404 Not Found`, `409 Conflict`, `500 Internal Error`) to communicate state clearly[cite: 1].
* **JSON Data Exchange:** Lightweight, machine-parsable JSON serves as the primary neurotransmitter for all client-server communication[cite: 1].
* **RESTful Naming:** Strictly utilizes nouns for resources and verbs for HTTP methods to maintain predictable documentation[cite: 1].

## Tech Stack
* **Environment:** Node.js
* **Framework:** Express.js
* **Validation:** Zod / Joi (Middleware)
* **Data Persistence:** Mock in-memory data structures (Array of JSON)

## Setup and Installation
1. Clone this repository to your local machine.
2. Open your terminal and navigate to the project directory.
3. Run `npm install` to install all necessary dependencies (Express, CORS, etc.).
4. Execute `npm start` to spin up the local server.
5. The API will be live at `http://localhost:3000`. Test the endpoints using Postman or Thunder Client.

## API Blueprint
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/users` | Safe, idempotent retrieval of all registered users[cite: 1]. |
| `POST` | `/users` | Creates a new user profile. Requires strict payload validation. |
| `GET` | `/transactions` | Retrieves the financial ledger (income/expenses). |
| `POST` | `/transactions` | Logs a new financial entry. |
| `GET` | `/quests` | Retrieves available gamification challenges. |
| `POST` | `/completions` | Marks a quest complete and triggers the backend XP/leveling engine. |

## Developer
* **Utkarsh Sharma** - Full Stack API Development
