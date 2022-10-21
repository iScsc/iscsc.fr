FROM node:18 as build-stage

WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .

ARG API_URL
ENV API_URL=$API_URL

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /frontend/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'
