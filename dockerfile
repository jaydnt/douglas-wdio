FROM node:latest
RUN apt-get install -y wget
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y google-chrome-stable_current_amd64.deb
WORKDIR /usr/src/app
COPY . .
EXPOSE 4444
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "wdio"]