# Use official image of Node.js
FROM node:18

# workplace
WORKDIR /app

# Copy files and package
COPY package.json package-lock.json ./
RUN npm install

# Copy the code
COPY . .

# Ecpose port
EXPOSE 5010

# Start application
CMD ["node", "server.js"]
