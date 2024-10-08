# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.10.0

################################################################################
# Use node image for the base image.
FROM node:${NODE_VERSION}-alpine as dev

# Set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install all dependencies, including devDependencies.
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 5173

# Run the application in development mode.
CMD npm run dev
