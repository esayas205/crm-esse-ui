# Use Node 20 LTS as the base image
FROM node:20-slim

# Set working directory inside the container
WORKDIR /workspace

# Install basic dependencies if needed (none strictly required for basic ng)
# If you need git or other tools, add them here:
# RUN apt-get update && apt-get install -y git

# The actual app will be in a subdirectory named <app-name>
# We don't COPY anything yet because the app doesn't exist on the host during scaffold.

# Expose the Angular dev server port
EXPOSE 4200

# Default command (will be overridden during scaffold or by docker-compose)
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "1000"]
