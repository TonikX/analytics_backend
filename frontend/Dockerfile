# pull official base image
FROM node:16.10.0-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json .
#RUN npm cache clean --force
RUN npm install

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . .

# start app
CMD ["npm", "start"]
