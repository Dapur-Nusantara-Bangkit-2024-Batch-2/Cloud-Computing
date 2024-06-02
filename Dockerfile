FROM node:22.1.0

WORKDIR /cloud-computing/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start"]