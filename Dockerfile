FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy everything
COPY . .

# Expose port for React dev server
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]
