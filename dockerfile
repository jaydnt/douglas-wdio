# Use Node.js as the base image
FROM node:20.10.0

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY . .
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose necessary ports (for debugging or remote Selenium Grid, if needed)
EXPOSE 4444

# Default command
CMD ["npm", "run", "wdio"]
