FROM node as builder
WORKDIR /build
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node
WORKDIR /app
COPY ./package.json .
RUN npm install --production
COPY ./build/server ./server
CMD [ "npm", "start" ]