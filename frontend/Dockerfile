# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Receive build argument
ARG VITE_BACKEND_URL

# Expose it to Vite
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Build app
RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

