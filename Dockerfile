FROM node:16.13.0
ARG GITHUB_TOKEN
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
VOLUME /app/public
RUN npx tsc
CMD [ "npm", "run", "dev" ]
