# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port your app runs on (if applicable)
# EXPOSE 3000

# Environment variables for MongoDB connection
ENV MONGO_DB_USERNAME=myuser
ENV MONGO_DB_PASSWORD=mypassword
ENV MONGO_DB_HOST=mydatabase_host
ENV MONGO_DB_PORT=27017
ENV MONGO_DB_NAME=mydatabase_name

# Start the Node.js application
CMD ["node", "app.js"]
