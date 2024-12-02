FROM node:20-alpine3.19
RUN apk add --no-cache \
    bash \
    wget \
    curl \
    chromium \
    nss \
    gconf \
    fontconfig \
    ttf-freefont \
    freetype \
    harfbuzz
WORKDIR /usr/src/app
COPY . .
EXPOSE 4444
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "wdio"]