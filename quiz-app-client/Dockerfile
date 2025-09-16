FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
# Vite automatically loads .env.production when NODE_ENV=production (or use --mode)
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]