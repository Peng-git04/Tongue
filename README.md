# Tongue — Hacker News Reader

**Tongue** is a minimal news reader that fetches the latest stories from Hacker News through its public API.

This project was developed as part of a technical assignment with specific architectural constraints, with a strong focus on **modularity, testability, and separation of concerns**.

---

## 🚀 Tech Stack

### Language & Modules

* **JavaScript (ES6+)**
* Native **ECMAScript Modules (ESM)** used in both development and production
* External dependencies managed with **NPM**

### Tooling

* **Vite** — Bundler and development server
* **Vitest** — Unit and integration testing framework

---

## 🏗 Architecture

The application implements the **Repository Pattern** combined with **Dependency Injection**, ensuring a clean separation between:

* Data Layer (API)
* Business Logic
* Presentation Layer (UI)

### Module Structure


`hackerNewsClient.js` | Handles HTTP calls only (no business logic)   
`NewsRepository.js`   | Manages pagination and data transformation    
`newsCard.js`         | Responsible for DOM rendering only            
`main.js`             | Application bootstrap and UI event management 

### Architectural Decisions

* `NewsRepository` receives the client via **Dependency Injection**, allowing:
 * Easy replacement with a mock client during testing
  * Testing business logic without real HTTP calls
* Each module follows the **Single Responsibility Principle (SRP)**
* The API layer is fully decoupled from the UI layer

This architecture ensures:

* High maintainability
* Strong testability
* Scalability and modularity

---

## 📦 External Libraries

*Axios    
*Dayjs  
*Lodash-es

---

## ✨ Features

* Fetches the latest **500 story IDs**
* Client-side pagination loading **10 stories at a time**
* “Load More” button for incremental loading
* Displays:
  * Title
  * External link
  * Source domain
  * Publication date
* Skeleton loading animation during fetch
* Graceful error handling for failed API requests

---

## 🎯 Project Goal

This project demonstrates the ability to:

* Apply architectural patterns in a frontend environment
* Write modular and testable code
* Properly separate application layers
* Use modern JavaScript tooling effectively
