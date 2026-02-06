# CRM ESSE UI

A modern CRM (Customer Relationship Management) frontend application built with Angular. This project features a clean, responsive interface for managing accounts, leads, contacts, opportunities, and activities.

## 🚀 Overview

This application is built using modern Angular practices, including standalone components, signals for state management, and a modular feature-based architecture. It provides a robust foundation for a CRM system with integrated API handling, centralized error notifications, and reusable UI components.

## 🛠 Technologies Used

- **Angular 21**: Utilizing standalone components, signals, and the latest router features.
- **RxJS**: For reactive data handling and debounced searches.
- **Reactive Forms**: For robust data entry and validation.
- **SASS/SCSS**: For structured and maintainable styling.
- **Docker**: For easy environment setup and containerized development.
- **Vitest**: For modern, fast unit testing.

## 📂 Project Structure

```text
crm-esse-ui/
├── angular-app/             # Main Angular source code
│   ├── src/app/
│   │   ├── core/            # Interceptors and core services
│   │   ├── features/        # Feature modules (Accounts, Leads, etc.)
│   │   ├── layout/          # Main application layout
│   │   └── shared/          # Reusable components and services
├── Dockerfile               # Node-based development image
├── docker-compose.yml       # Docker services configuration
└── IMPLEMENTATION.md        # Detailed implementation status and technical guide
```

## ✨ Features

### ✅ Implemented
- **Dashboard**: High-level overview of CRM metrics (placeholder).
- **Accounts**: Full CRUD operations, pagination, search, and detail views with related contacts/activities.
- **Leads**: Full CRUD operations, status tracking, and lead conversion to Accounts/Contacts.
- **Global Infrastructure**: Centralized API interceptors, toast notifications, and reusable pagination.

### 🔨 In Progress / Planned
- **Opportunities**: Sales pipeline tracking (Partial).
- **Contacts**: Individual contact management within accounts.
- **Activities**: Task, call, and meeting logging.
- **Enhanced Dashboard**: Real-time charts and metric widgets.

## 🚦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Docker](https://www.docker.com/) and Docker Compose (optional, for containerized run)
- Backend API running at `http://localhost:8080`

### Running with Docker (Recommended)
The easiest way to get started is using Docker Compose:

```bash
docker-compose up
```
The application will be available at `http://localhost:4200`.

### Running Manually
1. Navigate to the app directory:
   ```bash
   cd angular-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser to `http://localhost:4200`.

## 📖 Detailed Documentation

For a deep dive into the implementation details, API contracts, and the current development roadmap, please refer to the [IMPLEMENTATION.md](./IMPLEMENTATION.md) file.

---
Created by Esayas Bekele
