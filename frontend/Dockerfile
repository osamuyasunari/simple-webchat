FROM node:alpine as frontend
ARG REACT_APP_API_HOST=http://testingdomain6u1cui.space:3000
WORKDIR /app
COPY package.json ./
COPY . .
RUN npm i
RUN npm run-script build
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
