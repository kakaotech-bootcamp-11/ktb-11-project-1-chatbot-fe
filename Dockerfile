FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_URL=https://ktb-chatbot.shop/api
ARG NEXT_PUBLIC_IMAGE_URL=https://openweathermap.org/

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_IMAGE_URL=$NEXT_PUBLIC_IMAGE_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]