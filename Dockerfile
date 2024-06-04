FROM node:20.12.2-alpine3.18 as base

FROM base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "dev"]