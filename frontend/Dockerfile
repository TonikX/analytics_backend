# pull official base image
FROM node:16.10.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
#RUN rm package-lock.json
#RUN rm -rf node_modules
RUN npm install
RUN npm install react-app-rewired -g

# add app
COPY . ./

# start app
CMD ["npm", "start"]
