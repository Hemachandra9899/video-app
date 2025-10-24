# Simple dev Dockerfile (optional)
FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production=false
COPY src ./src
EXPOSE 8080
CMD ["npm","run","start"]
