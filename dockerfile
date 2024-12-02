FROM node:latest
RUN apt-get update && apt-get install -y wget
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get update && apt-get install -y google-chrome-stable
WORKDIR /usr/src/app
COPY . .
EXPOSE 4444
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "wdio"]