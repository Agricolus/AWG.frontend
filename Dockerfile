FROM node:lts-alpine

WORKDIR /awg.frontend

COPY package*.json ./

RUN npm install
RUN npm install --only=dev

COPY . .

ENTRYPOINT ["npm", "run"]
CMD ["serve"]