# Project-2-Backend-API-Development

## Overview
This repository contains the backend integration phase for DecodeLabs Project 2[cite: 1]. It serves as a pure RESTful API "nervous system" demonstrating robust server-side processing[cite: 1]. This project bridges the gap between client interaction and backend data management with absolute reliability[cite: 1]. 

## Core Architecture
* **Statelessness:** Engineered to handle requests independently, ensuring high availability and system resilience[cite: 1].
* **The Gatekeeper Rule:** Implements strict two-layer data validation (Syntactic format checking and Semantic logic verification) because we "Never Trust the Client"[cite: 1].
* **Semantic Communication:** Utilizes precise HTTP status codes (`201 Created`, `400 Bad Request`, `404 Not Found`, `409 Conflict`, `500 Internal Error`) to communicate state clearly[cite: 1].
* **JSON Data Exchange:** Lightweight, machine-parsable JSON serves as the primary neurotransmitter for all client-server communication[cite: 1].
* **RESTful Naming:** Strictly utilizes nouns for resources and verbs for HTTP methods to maintain predictable documentation[cite: 1].

## Tech Stack
* **Environment:** Node.js
* **Framework:** Express.js
* **Validation:** Zod (Middleware)
* **Data Persistence:** Mock in-memory data structures (Array of JSON)

## API Blueprint
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/users` | Safe, idempotent retrieval of all registered users[cite: 1]. |
| `POST` | `/api/v1/users` | Creates a new user profile. Requires strict payload validation. |

## Developer
* **Utkarsh Sharma** - Full Stack API Development
