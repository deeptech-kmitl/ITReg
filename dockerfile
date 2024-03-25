# Use Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /ITREG

# Copy package.json and package-lock.json to container

COPY package*.json ./
COPY .env ./

# Install dependencies
RUN npm install
# Copy the entire application to container
COPY . .

# # Build the React app
RUN npm run build
# Expose port 3000
EXPOSE 5173

# Command to serve the built React app
CMD ["npm","run", "preview"]
# CMD ["npm","run", "dev"]
