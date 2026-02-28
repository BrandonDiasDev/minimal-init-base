# syntax=docker/dockerfile:1

ARG NODE_VERSION=23.5.0
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


