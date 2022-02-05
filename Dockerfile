FROM node:16.13.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
VOLUME /app/public
RUN npx tsc
CMD [ "npm", "run", "dev" ]
