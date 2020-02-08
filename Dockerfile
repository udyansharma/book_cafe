FROM node:10.17.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# COPY package*.json ./

COPY . .

RUN npm install


EXPOSE 8090

CMD ["node","src/index.js"]
