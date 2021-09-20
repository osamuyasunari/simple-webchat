FROM node:alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY . .
RUN npm i
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]