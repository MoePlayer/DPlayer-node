FROM node:6-onbuild
WORKDIR /usr/src/app
RUN npm install pm2 -g
EXPOSE 1207
CMD pm2-docker index.js