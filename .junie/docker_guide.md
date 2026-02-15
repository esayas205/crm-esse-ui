# Docker Compose Usage Guide

This guide explains how to manage the Angular application using Docker Compose. Using Docker ensures a consistent development environment across different machines.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 1. Start the Development Server

To start the application in development mode (with hot-reloading):

```bash
docker-compose up
```

- The application will be available at: `http://localhost:4200`
- The container name is `angular`.
- Hot-reloading is enabled via file polling (configured in `docker-compose.yml`).

To run in the background:
```bash
docker-compose up -d
```

## 2. Install or Update Dependencies

If you add new packages to `package.json` or need to run `npm install`:

```bash
docker-compose run --rm angular npm install
```

## 3. Build the Application

To create a production build in the `dist/` folder:

```bash
docker-compose run --rm angular npm run build
```

## 4. Running Tests

To run the test suite:

```bash
docker-compose run --rm angular npm run test
```

## 5. Running Angular CLI Commands

You can run any Angular CLI command using `docker-compose run`:

```bash
# Generate a new component
docker-compose run --rm angular npx ng generate component my-component

# Run linting (if configured)
docker-compose run --rm angular npx ng lint
```

## 6. Stop and Clean Up

To stop the containers:
```bash
docker-compose stop
```

To stop and remove containers, networks, and images:
```bash
docker-compose down
```

---

## Troubleshooting

### Permissions Issues
On Linux, files created by the container (like components generated via CLI) might be owned by `root`. You can change the ownership back to your user:
```bash
sudo chown -R $USER:$USER .
```

### Port 4200 Already in Use
If you get an error that port 4200 is already in use, ensure no local Angular server is running, or change the port mapping in `docker-compose.yml`.

### Node Modules Conflicts
If you encounter issues related to `node_modules`, try removing the local `node_modules` folder and reinstalling via Docker:
```bash
rm -rf angular-app/node_modules
docker-compose run --rm angular npm install
```
