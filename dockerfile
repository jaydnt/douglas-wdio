FROM node:latest
RUN apt-get install -y libnss3 libgconf-2-4 libfontconfig1
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb
RUN apt -f install -y
WORKDIR /usr/src/app
COPY . .
EXPOSE 4444
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "wdio"]