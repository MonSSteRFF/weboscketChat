
start client/server `docker-compose up`

start client only `cd client && docker build -t websocketchatclient . && docker run -dp 127.0.0.1:3000:3000 websocketchatclient`

start server only `cd server && docker build -t websocketchatserver . && docker run -dp 127.0.0.1:3000:3000 websocketchatserver`
