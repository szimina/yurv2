FROM node:20-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build  # Собираем статику (должен создаться /app/dist)

# Финальный образ с Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80