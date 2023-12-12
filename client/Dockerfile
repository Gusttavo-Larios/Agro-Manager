FROM node:18-alpine

WORKDIR /var/www/client

COPY . /var/www/client

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]