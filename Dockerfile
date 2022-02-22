FROM node:16.14.0-alpine3.14

COPY . /home

RUN cd /home/client && \
    npm install && \
    npm run build

RUN cd /home/server && \
    npm install

CMD cd /home/server && npm start