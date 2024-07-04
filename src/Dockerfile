# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Install Angular CLI
RUN npm install -g @angular/cli@17

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install project dependencies
RUN npm install

# Make port 4200 available to the world outside this container
EXPOSE 4200

# Run the application
CMD ["ng", "serve", "--host", "0.0.0.0"]
