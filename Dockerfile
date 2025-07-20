# FROM node:18-alpine

# WORKDIR /app

# # Install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy everything
# COPY . .

# # Expose port for React dev server
# EXPOSE 3000

# # Start React development server
# CMD ["npm", "start"]


# For Kubernetes practice
# Stage 1: Build React App
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built React files to Nginx default public folder
COPY --from=build /app/build /usr/share/nginx/html

# Optional: custom Nginx config (optional if you're doing client-side routing)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


