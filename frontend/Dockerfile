FROM node:18.20.2-alpine

WORKDIR /frontend
COPY . /frontend

RUN npm install --legacy-peer-deps

CMD ["npm", "start"]
