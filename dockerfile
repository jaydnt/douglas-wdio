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

# Install Chrome and Edge browsers
RUN apt-get update && \
    apt-get install -y wget gnupg curl && \
    wget -qO- https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable chromium-driver && \
    apt-get install -y microsoft-edge-stable && \
    rm -rf /var/lib/apt/lists/*

# Expose necessary ports (for debugging or remote Selenium Grid, if needed)
EXPOSE 4444

# Default command
CMD ["npm", "run", "wdio"]
