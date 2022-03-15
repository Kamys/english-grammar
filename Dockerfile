# pull official base image
FROM node:17

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
CMD ["yarn", "start"]
