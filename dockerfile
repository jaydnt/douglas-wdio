FROM node:20-alpine3.19
RUN apt-get update && apt-get install -y wget gnupg2
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get update && apt-get install -y google-chrome-stable
RUN apt-get install -y libnss3 libgconf-2-4 libfontconfig1
WORKDIR /usr/src/app
COPY . .
EXPOSE 4444
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "wdio"]